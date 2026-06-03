// Stable sort to mirror TheMatrix editor view:
//   1. Group services by `optionGroupId` (ungrouped services last).
//   2. Within each group, sort by `displayOrder` ascending; nulls sink to the
//      bottom of the group.
//   3. Ties fall back to the original array index so the result is deterministic.
//
// The matrix uses `displayOrder` as a *within-group* sort key, so the same
// numeric value can appear in multiple groups. A global `displayOrder`-only
// sort interleaves groups, which is what the user reported.
export function byOptionGroupAndDisplayOrder<
  T extends {
    displayOrder?: number | null;
    optionGroupId?: string | null;
  },
>(items: readonly T[], optionGroups: readonly { id: string }[] = []): T[] {
  const groupRank = new Map<string, number>();
  optionGroups.forEach((g, i) => groupRank.set(g.id, i));
  const ungroupedRank = optionGroups.length;
  const rankOf = (gid: string | null | undefined) =>
    gid && groupRank.has(gid) ? groupRank.get(gid)! : ungroupedRank;

  return items
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const ga = rankOf(a.item.optionGroupId);
      const gb = rankOf(b.item.optionGroupId);
      if (ga !== gb) return ga - gb;
      const ao = a.item.displayOrder;
      const bo = b.item.displayOrder;
      if (ao == null && bo == null) return a.index - b.index;
      if (ao == null) return 1;
      if (bo == null) return -1;
      if (ao !== bo) return ao - bo;
      return a.index - b.index;
    })
    .map(({ item }) => item);
}
