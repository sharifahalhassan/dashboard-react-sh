export default function OrdersTable({
  // rows: مصفوفة الطلبات التي سيتم عرضها داخل الجدول
  // وضعنا قيمة افتراضية [] لتجنب الأخطاء في حال لم يتم تمرير بيانات
  rows = [],
}) {
  return (
    // الحاوية الخارجية للجدول
    // تعطي شكل كرت/صندوق واحد يحتوي الجدول كامل
    <div className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      {/* wrapper يسمح بالتمرير الأفقي في حال كان الجدول أعرض من الشاشة */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          {/* رأس الجدول */}
          <thead className="text-left text-zinc-600 dark:text-zinc-400">
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              {/* عناوين الأعمدة */}
              <th className="px-5 py-3 font-medium">Order number</th>
              <th className="px-5 py-3 font-medium">Purchase date</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Event</th>
              <th className="px-5 py-3 font-medium text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            {/* إنشاء صف لكل طلب باستخدام map */}
            {rows.map((r) => (
              <tr
                // key ضروري لتمييز كل صف في React
                key={r.id}
                className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
              >
                {/* رقم الطلب */}
                <td className="px-5 py-3 font-medium text-zinc-900 dark:text-zinc-50">
                  {r.id}
                </td>

                {/* تاريخ الشراء */}
                <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400">
                  {r.date}
                </td>

                {/* اسم العميل */}
                <td className="px-5 py-3 text-zinc-900 dark:text-zinc-50">
                  {r.customer}
                </td>

                {/* بيانات الفعالية */}
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* إذا كان هناك صورة للفعالية نعرضها */}
                    {r.eventImg ? (
                      <img
                        // صورة الفعالية
                        src={r.eventImg}
                        // alt فارغ لأن الصورة تجميلية وليست أساسية للمعلومة
                        alt=""
                        className="h-9 w-9 rounded-lg object-cover border border-zinc-200 dark:border-zinc-800"
                      />
                    ) : (
                      // في حال عدم وجود صورة نعرض placeholder
                      <div className="h-9 w-9 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                    )}

                    <div className="min-w-0">
                      {/* اسم الفعالية */}
                      {/* truncate لمنع كسر التصميم عند النص الطويل */}
                      <div className="truncate text-zinc-900 dark:text-zinc-50">
                        {r.eventName}
                      </div>
                    </div>
                  </div>
                </td>

                {/* مبلغ الطلب */}
                <td className="px-5 py-3 text-right font-medium text-zinc-900 dark:text-zinc-50">
                  {r.amount}
                </td>
              </tr>
            ))}

            {/* في حال عدم وجود أي طلبات */}
            {rows.length === 0 && (
              <tr>
                <td
                  // colSpan=5 عشان الرسالة تمتد على كامل أعمدة الجدول
                  className="px-5 py-10 text-center text-zinc-500 dark:text-zinc-400"
                  colSpan={5}
                >
                  No orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
