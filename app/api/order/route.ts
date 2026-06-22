import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

function buildTransport() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, governorate, products, quantity, notes, total } = body

    if (!name || !phone || !products?.length) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
    }

    const toEmail = process.env.CONTACT_EMAIL_TO ?? 'happy.farm7890@gmail.com'

    const transport = buildTransport()

    await transport.sendMail({
      from: `"هابي فارم Orders" <${process.env.GMAIL_USER}>`,
      to: toEmail,
      subject: `طلب جديد من ${name} — هابي فارم`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #fafaf8; border-radius: 12px;">
          <h1 style="color: #1E6B3C; font-size: 24px; margin-bottom: 4px;">🌿 طلب جديد — هابي فارم</h1>
          <p style="color: #6B7355; font-size: 14px; margin-bottom: 24px;">تم استلام هذا الطلب من موقع هابي فارم</p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 12px; background: #f0f4f0; border-radius: 8px 8px 0 0; font-weight: bold; color: #1E6B3C; font-size: 13px;">الاسم</td>
              <td style="padding: 10px 12px; background: #f0f4f0; border-radius: 8px 8px 0 0; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: bold; color: #1E6B3C; font-size: 13px; border-bottom: 1px solid #e8ede8;">رقم الهاتف</td>
              <td style="padding: 10px 12px; font-size: 14px; border-bottom: 1px solid #e8ede8;" dir="ltr">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f0f4f0; font-weight: bold; color: #1E6B3C; font-size: 13px;">المنطقة</td>
              <td style="padding: 10px 12px; background: #f0f4f0; font-size: 14px;">الإسكندرية</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: bold; color: #1E6B3C; font-size: 13px; border-bottom: 1px solid #e8ede8;">المنتجات</td>
              <td style="padding: 10px 12px; font-size: 14px; border-bottom: 1px solid #e8ede8;">${Array.isArray(products) ? products.join('<br/>') : products}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f0f4f0; font-weight: bold; color: #1E6B3C; font-size: 13px;">عدد الزجاجات</td>
              <td style="padding: 10px 12px; background: #f0f4f0; font-size: 14px;">${quantity || 'غير محدد'}</td>
            </tr>
            ${total ? `
            <tr>
              <td style="padding: 10px 12px; font-weight: bold; color: #1E6B3C; font-size: 13px; border-bottom: 1px solid #e8ede8;">إجمالي الطلب</td>
              <td style="padding: 10px 12px; font-size: 15px; font-weight: bold; color: #1E6B3C; border-bottom: 1px solid #e8ede8;">${total} جنيه</td>
            </tr>
            ` : ''}
            ${notes ? `
            <tr>
              <td style="padding: 10px 12px; background: #f0f4f0; font-weight: bold; color: #1E6B3C; font-size: 13px;">ملاحظات / العنوان</td>
              <td style="padding: 10px 12px; background: #f0f4f0; font-size: 14px;">${notes}</td>
            </tr>
            ` : ''}
          </table>

          <div style="margin-top: 24px; padding: 16px; background: #fff3f0; border: 1px solid #ffd0c8; border-radius: 8px;">
            <p style="color: #c0392b; font-size: 13px; margin: 0;">
              <strong>تذكير:</strong> تأكد من استلام صورة إيصال فودافون كاش من العميل قبل تأكيد الطلب.
            </p>
          </div>

          <p style="margin-top: 20px; color: #aaa; font-size: 11px; text-align: center;">هابي فارم — Organic Products | happy.farm7890@gmail.com</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[order-api]', err)
    return NextResponse.json({ error: 'internal_error' }, { status: 500 })
  }
}
