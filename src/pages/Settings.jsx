import { useMemo, useState } from "react"
import { Input, Textarea, Select, Row } from "../components/form/formComponents"
import Loader from "../components/ui/Loader"
import ErrorState from "../components/ui/ErrorState"
// وضعناها خارج المكوّن عشان تكون ثابتة وما تنعاد إنشاؤها بكل رندر
const initialForm = {
  orgName: "Catalyst",
  bio: "",
  email: "support@catalyst.com",
  showEmail: true,
  region: "Ontario",
  country: "Canada",
  currency: "CAD",
}
console.log(Row)
 


export default function Settings() {
 const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  // حالة الفورم كاملة كـ object واحد
  // هذا يسهل حفظ/إرسال البيانات مرة واحدة بدل حالات متعددة
  const [form, setForm] = useState(initialForm)

  // عداد طول الـ bio (قيمة مشتقة من form.bio)
  // useMemo استخدمناه عشان ما نحسب length إلا لما تتغير bio نفسها
  const bioCount = useMemo(() => form.bio.length, [form.bio])

  // دالة تحديث عامة لأي حقل في الفورم
  // استخدمناها بدل ما نكتب setForm لكل input بشكل مكرر
  // استخدمنا functional update (p) لضمان أخذ آخر نسخة من الحالة
  function update(key, value) {
    setForm((p) => ({ ...p, [key]: value }))
  }

  // إعادة الفورم للقيم الابتدائية
  // مفيدة لزر Reset
  function onReset() {
    setForm(initialForm)
  }

  // حفظ البيانات عند إرسال الفورم
  // preventDefault لمنع إعادة تحميل الصفحة (سلوك form الافتراضي)
  // حالياً فقط نطبع البيانات، وبالمستقبل ممكن إرسالها API
  function onSave(e) {
    e.preventDefault()
    console.log("Saving settings:", form)
  }
if (loading){
  return <Loader/>
}
 if (error) {
    return (
      <ErrorState
        title="Failed to load events"
        description="Something went wrong while loading events."
        actionLabel="Retry"
        onAction={() => {
          setError(false)
          setLoading(true)
        }}
      />
    )
  }

  return (
    <section className="min-w-0">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Settings
      </h1>
      <div className="mt-6 h-px bg-zinc-200 dark:bg-zinc-800" />
      <form onSubmit={onSave} className="mt-2">
        <Row
          title="Organization Name"
          desc="This will be displayed on your public profile."
        >
          <Input
            value={form.orgName}
            onChange={(e) => update("orgName", e.target.value)}
            placeholder="Organization name"
          />
        </Row>
        <div className="h-px bg-zinc-200 dark:bg-zinc-800" />
        <Row
          title="Organization Bio"
          desc="This will be displayed on your public profile. Maximum 240 characters."
        >
          <div className="space-y-2">
            <Textarea
              value={form.bio}
              // قصّينا النص إلى 240 حرف لضمان عدم تجاوز الحد
              // slice(0, 240) يضمن حتى لو المستخدم لصق نص طويل ما يتجاوز الحد
              onChange={(e) => update("bio", e.target.value.slice(0, 240))}
              placeholder="Write a short bio..."
            />
            <div className="text-xs text-zinc-600 dark:text-zinc-400">
              {/* عرض عدد الأحرف الحالية مقابل الحد */}
              {bioCount}/240
            </div>
          </div>
        </Row>

        <div className="h-px bg-zinc-200 dark:bg-zinc-800" />
        <Row
          title="Organization Email"
          desc="This is how customers can contact you for support."
        >
          <div className="space-y-3">
            <Input
              // تحديد النوع email يساعد المتصفح في التحقق وإظهار لوحة مناسبة بالموبايل
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="support@your-org.com"
            />
            <label className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <input
                // checkbox نستخدمه للقيم المنطقية true/false
                type="checkbox"
                // في checkbox نربط checked بدل value
                checked={form.showEmail}
                // e.target.checked يعطي القيمة المنطقية مباشرة
                onChange={(e) => update("showEmail", e.target.checked)}
                className="
                  h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900
                  dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100
                  dark:focus:ring-zinc-100
                "
              />
              Show email on public profile
            </label>
          </div>
        </Row>

        <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

        <Row
          title="Address"
          desc="This is where your organization is registered."
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Select
              // ربط اختيار المنطقة بالحالة
              value={form.region}
              onChange={(e) => update("region", e.target.value)}
            >
              <option>Ontario</option>
              <option>British Columbia</option>
              <option>Alberta</option>
              <option>Quebec</option>
            </Select>

            <Select
              // ربط اختيار الدولة بالحالة
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
            >
              <option>Canada</option>
              <option>United States</option>
              <option>United Kingdom</option>
            </Select>
          </div>
        </Row>

        <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

        <Row
          title="Currency"
          desc="The currency that your organization will be collecting."
        >
          <Select
            // ربط العملة بالحالة
            value={form.currency}
            onChange={(e) => update("currency", e.target.value)}
          >
            {/* هنا حددنا value صراحة لأننا نحتاج قيمة ثابتة للتخزين/الإرسال */}
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="USD">USD - United States Dollar</option>
            <option value="GBP">GBP - British Pound</option>
          </Select>
        </Row>

        <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 py-6">
          <button
            // type="button" مهم لأن الزر داخل form
            // بدونها قد يتصرف كـ submit افتراضيًا
            type="button"
            onClick={onReset}
            className="
              rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900
              hover:bg-zinc-50 transition
              dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800
            "
          >
            Reset
          </button>

          <button
            // submit يطلق onSubmit في الفورم
            type="submit"
            className="
              rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white
              hover:bg-zinc-800 transition
              dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200
            "
          >
            Save changes
          </button>
        </div>
      </form>
    </section>
  )
}
