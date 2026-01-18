// استيراد مكوّن جدول الطلبات
// نستخدمه لعرض البيانات (الطلبات) بشكل منظم داخل جدول بدل ما نكتب الجدول هنا
import OrdersTable from "../components/OrdersTable"

// بيانات تجريبية للطلبات (Mock Data)
// وضعناها كثابت خارج المكوّن عشان ما تنعاد إنشاء البيانات بكل رندر
// وتكون نفس المرجع (reference) ثابت إذا ما احتجنا نغيّرها
const ORDERS = [
  {
    // id: رقم/معرّف الطلب
    id: "3000",
    // date: تاريخ إنشاء/تنفيذ الطلب
    date: "May 9, 2024",
    // customer: اسم العميل الذي قام بالطلب
    customer: "Leslie Alexander",
    // eventName: اسم الفعالية المرتبطة بالطلب
    eventName: "Bear Hug: Live in Concert",
    // eventImg: صورة مصغّرة للفعالية
    eventImg:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=96&q=60",
    // amount: قيمة الطلب المعروضة كنص (مع العملة)
    amount: "US$80.00",
  },
  {
    id: "3001",
    date: "May 5, 2024",
    customer: "Michael Foster",
    eventName: "Six Fingers — DJ Set",
    eventImg:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=96&q=60",
    amount: "US$299.00",
  },
  {
    id: "3002",
    date: "Apr 28, 2024",
    customer: "Dries Vincent",
    eventName: "We All Look The Same",
    eventImg:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=96&q=60",
    amount: "US$150.00",
  },
  {
    id: "3004",
    date: "Apr 18, 2024",
    customer: "Courtney Henry",
    eventName: "Viking People",
    eventImg:
      "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=96&q=60",
    amount: "US$114.99",
  },
]

export default function Orders() {
  // صفحة Orders: مسؤولة عن عرض عنوان الصفحة + زر إنشاء طلب + جدول الطلبات
  return (
    <section className="min-w-0">
      <div className="flex items-start justify-between gap-4">
        {/* عنوان الصفحة */}
        <h1 className="text-2xl font-semibold">Orders</h1>

        {/* زر إنشاء طلب جديد */}
        {/* حاليًا ما فيه onClick، غالبًا لاحقًا يتم ربطه بفتح مودال أو الانتقال لصفحة إنشاء */}
        <button className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 transition">
          Create order
        </button>
      </div>

      <div className="mt-6">
        {/* تمرير بيانات الطلبات إلى مكوّن OrdersTable */}
        {/* rows هي الـ props التي يعتمد عليها OrdersTable لعرض الصفوف */}
        <OrdersTable rows={ORDERS} />
      </div>
    </section>
  )
}
