SELECT
  "order"."id",
  "order"."description",
  "order"."isPayment",
  "order"."updatedAt",
  "order"."deletedAt",
  "order"."clientId",
  SUM("compositionOrders"."sale") AS "n_hats"
FROM
  "orders" AS "order"
  LEFT OUTER JOIN "compositionOrders" AS "compositionOrders" ON "order"."id" = "compositionOrders"."orderId"
  AND ("compositionOrders"."deletedAt" IS NULL)
WHERE
  (
    "order"."deletedAt" IS NULL
    AND "order"."clientId" = 2
  )
GROUP BY
  "order"."id"