# LakazAgri — Trust layer feature matrix

Additions that sit **on top of demand–availability matching**.  
Core principle: every feature attaches to a **matched order / batch**, stays **offline-first**, and earns commercial trust without requiring blockchain in the first releases.

## Current baseline (live)

Already shipping (foundation):

- Farmer / buyer registration  
- Post availability & post demand  
- Browse demands  
- Matching (where enabled)  
- Offline-first local storage + later sync  

---

## Must-have — Trust Phase 1 (**shipped** in pilot APK v1.3-trust)

| Feature | What it does | Integration with current flow | Main commercial value | Offline / practical notes |
|---------|----------------|------------------------------|------------------------|---------------------------|
| **Simple Produce Origin & Batch Record** | Farmer records basic origin for a matched order (zone/location, variety, approx. harvest date, quantity). Generates a simple **batch ID**. | Attached to the **accepted demand match**. Buyer sees origin summary when confirming or receiving. | Basic traceability and trust; fewer “where did this come from?” disputes. | Fully offline. Local storage, sync later. Minimal fields for fast entry. |
| **Quality Confirmation / Photo Log** | At harvest or delivery: 1–3 photos + optional notes (size, ripeness, defects). Shared log for both parties. | Linked to the **same batch/order**. Appears on the order timeline. | Shared digital record; sharp reduction in post-delivery quality disputes. | Photos queued offline; upload when online. **Aggressive compression**. |
| **Payment Status & Proof** | Status track: Agreed price → Invoice sent → Paid / Partially paid. Attach mobile-money receipt or payment photo. | Lives in **order detail**. Both sides can update status. | Removes a major conflict source; builds long-term relationships. | Status offline-capable. Receipts queued like quality photos. |

**Design rules for Trust Phase 1**

1. Only unlocked **after a match is accepted** (not free-floating forms).  
2. One **batch ID** per fulfilled slice of a match.  
3. Same screen family as “order detail” — no separate complex module.  
4. No blockchain required; local event log + sync is enough.  

---

## High-value — Phase 2

| Feature | What it does | Integration | Commercial value | Offline notes |
|---------|--------------|-------------|------------------|---------------|
| **Input Declaration (Seeds / Fertiliser)** | Optional: seeds/fertiliser used; “certified” or “unknown source”. Later: link to verified suppliers. | Attached to batch at planting / early growth. Visible to buyers who filter on method. | Differentiates produce for hotels/exporters; starts input transparency. | Optional; must not block adoption. Offline form. |
| **Shared Order Timeline / Digital Trail** | Auto timeline: Match accepted → Planting noted → Harvest photos → Delivery → Payment. Same history for both sides. | Background of every matched order. | Shared record for disputes and buyer due diligence. | Events local-first; sync later. Keep simple. |

---

## Nice-to-have — Phase 3+

| Feature | What it does | Integration | Commercial value | Offline notes |
|---------|--------------|-------------|------------------|---------------|
| **Basic Compliance / Export-ready Summary** | One-tap summary (origin, quality notes, key dates) as clean view or PDF. | Generated from existing batch data. | Attractive to hotels, exporters, institutions. | On-device or post-sync. No blockchain required at this stage. |
| **Verified Input Supplier Link** *(later)* | Recognised agro-dealers tagged as “verified source”. | Optional field on Input Declaration. | Strengthens input authenticity story. | Only after core trust features are stable. |

---

## Suggested data model (lightweight)

```
Match (existing)
  └── OrderFulfilment / Batch
        batchId
        origin (zone, variety, harvestDateApprox, quantity)
        qualityLogs[] (photos localUri/remoteUrl, notes, authorRole, ts)
        payment (status, amount?, proofs[])
        inputs? (optional, Phase 2)
        events[] (timeline, Phase 2 — or derive from above)
```

---

## Implementation order (engineering)

1. **Batch entity** + create from accepted match  
2. **Origin form** (farmer) + buyer read-only summary  
3. **Photo queue** service (compress → store → sync)  
4. **Payment status** enum + proof attachments  
5. **Order detail** screen wiring all three  
6. Phase 2: inputs form + unified timeline UI  
7. Phase 3: summary/PDF export  

---

## Marketing messaging (for site / pilots)

- **Now:** Coordinate supply and demand.  
- **Next:** “Trust on every matched order” — origin, quality photos, payment proof.  
- **Later:** Production method notes, full order trail, export-ready summaries.  

Avoid over-promising blockchain or certification until those layers actually ship.


---

## How to open in the app (v1.3-trust)

1. Open the **Matches** tab  
2. Tap a match  
3. Tap **Open trust / order record**  
4. Save origin → add quality photos → set payment status / attach proof  

Public download: https://lakazagri.mkweli.tech/downloads/lakazagri-phase-1-v1.3-trust.apk
