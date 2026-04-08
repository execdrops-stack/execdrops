# HEARTBEAT.md

## Weekday Morning Brief (8am ET)
On weekday mornings between 8:00-9:00 AM ET, if not already sent today:
1. Run social arbitrage scan (node /Users/theclawww/.openclaw/workspace/scripts/social-arbitrage-brief.js)
2. Check pre-market movers via finance.yahoo.com/most-active or similar
3. Cross-reference: are any big movers explained by Reddit consumer signals?
4. Send morning brief to Adam's Discord DM (channel: 1485095998844960959)
Track last sent in memory/heartbeat-state.json under "lastChecks.morningBrief"

## Fin.Link New Listings Check (every 2 days)
Check fin.link marketplace for new Florida/PA/DE listings.
Login using saved cookies at /workspace/finlink-cookies.json
Flag any new listings matching: seller, Florida, $10M-$200M AUM, or PA/NJ/DE region
Send to Adam's Discord if new listings found.
Track under "lastChecks.finlink"

## EXEC Brand Check (daily when active, otherwise every 2 days)
Check execdrops.com operations and momentum.
1. Check Printful orders / fulfillment status
2. Check whether any new orders came in
3. Check recent Instagram and TikTok post status if accessible
4. Review whether Drop 001 story, scarcity, and bio/link setup still look coherent
5. If there is a clear next marketing move, do it without waiting
6. Send Adam a brief update only if something changed materially
Track under "lastChecks.execBrand"
