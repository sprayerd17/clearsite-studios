"use client";

import { useMemo, useState } from "react";
import { Check, Plus, Search, Zap } from "@/components/icons";
import { useAdmin } from "@/components/admin/AdminProvider";
import {
  Button,
  Card,
  Chip,
  ConfirmButton,
  EmptyState,
  ErrorText,
  Field,
  Input,
  MoneyInput,
  Notice,
  NumberInput,
  PageLoader,
  Sheet,
  Textarea,
  Toggle,
  labelClass,
} from "@/components/admin/ui";
import { useAction } from "@/components/admin/useAction";
import { deletePrice, savePrice } from "@/lib/firebase/data";
import { autoAddChoices } from "@/lib/quote/brief";
import { ruleKey, ruleQty } from "@/lib/quote/leads";
import { formatRand } from "@/lib/quote/money";
import type { PriceItem } from "@/lib/quote/types";

interface ChoiceGroup {
  id: string;
  title: string;
  options: { key: string; label: string; full: string }[];
}

/** autoAddChoices() grouped by question, e.g. "pages" → ["One page", "2–5 pages", …]. */
function groupChoices(): ChoiceGroup[] {
  const groups: ChoiceGroup[] = [];
  for (const c of autoAddChoices()) {
    const id = c.key.split(":")[0];
    const [title, option] =
      id === "service" ? ["Service", c.label.replace(/^Service:\s*/, "")] : (c.label.split(" → ") as [string, string?]);
    let group = groups.find((g) => g.id === id);
    if (!group) groups.push((group = { id, title, options: [] }));
    group.options.push({ key: c.key, label: option ?? c.label, full: c.label });
  }
  return groups;
}

export default function PricesPage() {
  const { prices, pricesLoaded } = useAdmin();
  const [editing, setEditing] = useState<Partial<PriceItem> | null>(null);
  const groups = useMemo(groupChoices, []);
  const { run, pending, error } = useAction();

  // "storeFeatures:eft" → "Store features: EFT"
  const shortLabel = useMemo(() => {
    const humanize = (id: string) => {
      const words = id.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
      return words.charAt(0).toUpperCase() + words.slice(1);
    };
    const map = new Map<string, string>();
    for (const g of groups) for (const o of g.options) map.set(o.key, `${humanize(g.id)}: ${o.label}`);
    return (rule: string) => {
      const base = map.get(ruleKey(rule)) ?? ruleKey(rule);
      const qty = ruleQty(rule);
      return qty > 1 ? `${base} ×${qty}` : base;
    };
  }, [groups]);

  const nextOrder = prices.reduce((max, p) => Math.max(max, p.order), 0) + 1;
  const activeCount = prices.filter((p) => p.active).length;
  const categories = useMemo(() => {
    const map = new Map<string, PriceItem[]>();
    for (const p of prices) map.set(p.category || "Other", [...(map.get(p.category || "Other") ?? []), p]);
    return [...map.entries()];
  }, [prices]);

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className={labelClass}>Private</p>
          <h1 className="mt-1.5 text-[28px] tracking-[-0.04em] sm:text-[32px]">Price list</h1>
        </div>
        <Button variant="lime" size="sm" onClick={() => setEditing({ active: true, order: nextOrder, autoAddFor: [] })}>
          <Plus size={16} /> Add item
        </Button>
      </div>

      <Notice icon={<Zap size={16} />}>
        These prices are private. New quote requests get a draft quote built from the items whose auto-add rules match their
        answers — you always review before sending. To change prices in bulk, fill in{" "}
        <span className="font-mono text-[12px]">pricing/ClearSite-Price-List.xlsx</span> and run{" "}
        <span className="font-mono text-[12px]">npm run prices:import</span>.
      </Notice>

      <ErrorText>{error}</ErrorText>

      {!pricesLoaded ? (
        <PageLoader label="Loading prices" />
      ) : prices.length === 0 ? (
        <EmptyState
          title="No prices yet"
          action={
            <Button variant="ink" size="sm" onClick={() => setEditing({ active: true, order: 1, autoAddFor: [] })}>
              <Plus size={16} /> Add your first item
            </Button>
          }
        >
          Add the things you charge for — a one-page site, extra pages, a booking form, an online store setup.
        </EmptyState>
      ) : (
        <>
          <p className="px-1 text-sm text-muted">
            {prices.length} item{prices.length === 1 ? "" : "s"} · {activeCount} active
          </p>
          {categories.map(([category, items]) => (
          <section key={category} className="space-y-2">
          <p className="px-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{category}</p>
          <Card className="overflow-hidden">
            <ul className="divide-y divide-line">
              {items.map((p) => (
                <li key={p.id} className={`flex items-start gap-3 px-4 py-4 sm:px-5 ${p.active ? "" : "bg-paper/50"}`}>
                  <button type="button" onClick={() => setEditing(p)} className="min-w-0 flex-1 text-left">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className={`font-medium ${p.active ? "text-ink" : "text-muted"}`}>{p.name}</p>
                      <p className={`shrink-0 font-semibold tabular-nums ${p.active ? "text-ink" : "text-muted"}`}>{formatRand(p.price)}</p>
                    </div>
                    {p.description && <p className="mt-0.5 line-clamp-2 text-sm text-muted">{p.description}</p>}
                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-[10px] tabular-nums text-muted-light">{p.sku ?? `#${p.order}`}</span>
                      {p.unit && p.unit !== "once-off" && <span className="text-[11px] text-muted">{p.unit}</span>}
                      {!p.active && <Chip tone="muted">Hidden</Chip>}
                      {p.autoAddFor.length === 0 ? (
                        <span className="text-xs text-muted-light">Added by hand only</span>
                      ) : (
                        <>
                          {p.autoAddFor.slice(0, 3).map((k) => (
                            <span key={k} className="inline-flex items-center gap-1 rounded-full bg-lime-soft px-2 py-0.5 text-[11px] font-medium text-lime-ink">
                              <Zap size={10} /> {shortLabel(k)}
                            </span>
                          ))}
                          {p.autoAddFor.length > 3 && <span className="text-xs text-muted">+{p.autoAddFor.length - 3} more</span>}
                        </>
                      )}
                    </div>
                  </button>
                  <div className="pt-0.5">
                    <Toggle
                      size="sm"
                      checked={p.active}
                      label={p.active ? `Hide ${p.name}` : `Show ${p.name}`}
                      disabled={pending(`toggle-${p.id}`)}
                      onChange={(active) => run(() => savePrice({ ...p, active }), `toggle-${p.id}`)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Card>
          </section>
          ))}
        </>
      )}

      {editing && <PriceSheet key={editing.id ?? "new"} item={editing} groups={groups} onClose={() => setEditing(null)} />}
    </div>
  );
}

function PriceSheet({ item, groups, onClose }: { item: Partial<PriceItem>; groups: ChoiceGroup[]; onClose: () => void }) {
  const [name, setName] = useState(item.name ?? "");
  const [description, setDescription] = useState(item.description ?? "");
  const [price, setPrice] = useState(item.price ?? 0);
  const [order, setOrder] = useState(item.order ?? 1);
  const [active, setActive] = useState(item.active ?? true);
  const [rules, setRules] = useState<string[]>(item.autoAddFor ?? []);
  const [category, setCategory] = useState(item.category ?? "");
  const [unit, setUnit] = useState(item.unit ?? "");
  const [q, setQ] = useState("");
  const { run, pending, busy, error, fail } = useAction();

  const known = useMemo(() => new Set(groups.flatMap((g) => g.options.map((o) => o.key))), [groups]);
  const unknown = rules.filter((k) => !known.has(ruleKey(k)));

  const shown = useMemo(() => {
    const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return groups;
    return groups
      .map((g) => ({
        ...g,
        options: g.options.filter((o) => words.every((w) => `${g.title} ${o.label}`.toLowerCase().includes(w))),
      }))
      .filter((g) => g.options.length > 0);
  }, [groups, q]);

  const ruleFor = (key: string) => rules.find((r) => ruleKey(r) === key);
  const toggle = (key: string) =>
    setRules((r) => (r.some((x) => ruleKey(x) === key || x === key) ? r.filter((x) => ruleKey(x) !== key && x !== key) : [...r, key]));

  async function save() {
    if (!name.trim()) return fail("Give the item a name.");
    const ok = await run(
      () =>
        savePrice({
          ...(item.id ? { id: item.id } : {}),
          name: name.trim(),
          description: description.trim(),
          price,
          order,
          active,
          autoAddFor: rules,
          ...(item.sku ? { sku: item.sku } : {}),
          category: category.trim(),
          unit: unit.trim(),
        }),
      "save",
    );
    if (ok) onClose();
  }

  async function remove() {
    if (!item.id) return;
    if (await run(() => deletePrice(item.id!), "delete")) onClose();
  }

  return (
    <Sheet
      open
      onClose={onClose}
      title={item.id ? "Edit price" : "New price"}
      footer={
        <div className="flex items-center gap-2">
          {item.id && (
            <ConfirmButton onConfirm={remove} pending={pending("delete")} disabled={busy} size="md" confirmLabel="Tap to delete">
              Delete
            </ConfirmButton>
          )}
          <Button variant="ink" className="flex-1" onClick={save} pending={pending("save")} disabled={busy}>
            Save
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <Field label="Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. One-page website" autoFocus={!item.id} />
        </Field>
        <Field label="Description" hint="Shown to the client under the item name on the quote.">
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-20" />
        </Field>
        <div className="grid grid-cols-[minmax(0,1fr)_96px] gap-3">
          <Field label="Price">
            <MoneyInput value={price} onChange={setPrice} />
          </Field>
          <Field label="Order">
            <NumberInput value={order} onChange={setOrder} min={0} max={9999} />
          </Field>
        </div>
        {price === 0 && <p className="-mt-3 text-xs text-amber-800">R0.00 — remember to set a price, or quotes will warn you.</p>}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Category">
            <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Business workflows" />
          </Field>
          <Field label="Unit">
            <Input value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="e.g. per page" />
          </Field>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-2xl bg-paper px-4 py-3">
          <div>
            <p className="font-medium">Active</p>
            <p className="text-xs text-muted">Hidden items aren&apos;t auto-added or offered in the quote picker.</p>
          </div>
          <Toggle checked={active} onChange={setActive} label="Active" />
        </div>

        <div>
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <p className={labelClass}>Auto-add to new quotes when…</p>
            {rules.length > 0 && (
              <button type="button" onClick={() => setRules([])} className="text-xs font-medium text-muted hover:text-ink">
                Clear ({rules.length})
              </button>
            )}
          </div>
          <p className="mb-3 text-xs leading-relaxed text-muted">
            …the brief includes <strong className="font-medium text-ink">any</strong> of these answers. Leave empty to only add it by hand.
          </p>
          <div className="relative mb-3">
            <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-light" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter answers" className="pl-10" type="search" />
          </div>
          <div className="space-y-4">
            {shown.map((g) => (
              <div key={g.id}>
                <p className="mb-2 text-xs font-medium text-muted">{g.title}</p>
                <div className="flex flex-wrap gap-1.5">
                  {g.options.map((o) => {
                    const rule = ruleFor(o.key);
                    const on = Boolean(rule);
                    const qty = rule ? ruleQty(rule) : 1;
                    return (
                      <button
                        key={o.key}
                        type="button"
                        onClick={() => toggle(o.key)}
                        aria-pressed={on}
                        title={o.full}
                        className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                          on ? "border-ink bg-ink text-white" : "border-line bg-white text-muted hover:border-line-strong hover:text-ink"
                        }`}
                      >
                        {on && <Check size={13} className="text-lime" strokeWidth={2.5} />}
                        {o.label}
                        {on && qty > 1 && <span className="font-mono text-[11px] text-lime">×{qty}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            {shown.length === 0 && <p className="text-sm text-muted">No answers match “{q}”.</p>}
            {unknown.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-medium text-muted">No longer in the quote form</p>
                <div className="flex flex-wrap gap-1.5">
                  {unknown.map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => toggle(k)}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 font-mono text-xs text-amber-900"
                    >
                      {k} <span aria-hidden="true">×</span>
                      <span className="sr-only">Remove</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <ErrorText>{error}</ErrorText>
      </div>
    </Sheet>
  );
}
