import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Get admin email from environment variable with fallback
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contact@serviceflow.agency';

// Define validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Imię i nazwisko musi mieć minimum 2 znaki'),
  email: z.string().email('Nieprawidłowy adres email'),
  phone: z.string().optional(),
  service_type: z.string().min(1, 'Wybierz typ usługi'),
  message: z.string().min(10, 'Wiadomość musi mieć minimum 10 znaków'),
  terms: z.boolean().refine((val) => val === true, {
    message: 'Musisz zaakceptować politykę prywatności',
  }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = contactFormSchema.parse(body);

    // Prepare email content
    const adminEmailContent = `
      Nowe zapytanie kontaktowe:
      
      Imię i nazwisko: ${validatedData.name}
      Email: ${validatedData.email}
      Telefon: ${validatedData.phone || 'Nie podano'}
      Typ usługi: ${validatedData.service_type}
      
      Wiadomość:
      ${validatedData.message}
    `;

    const userEmailContent = `
      Dziękujemy za kontakt z ServiceFlow!
      
      Otrzymaliśmy Twoje zapytanie i skontaktujemy się z Tobą w ciągu 24 godzin.
      
      Oto podsumowanie Twojego zapytania:
      
      Typ usługi: ${validatedData.service_type}
      
      Twoja wiadomość:
      ${validatedData.message}
      
      Pozdrawiamy,
      Zespół ServiceFlow
    `;

    // Send email to admin
    await resend.emails.send({
      from: 'ServiceFlow <contact@serviceflow.agency>',
      to: ADMIN_EMAIL,
      subject: `Nowe zapytanie: ${validatedData.service_type}`,
      text: adminEmailContent,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: 'ServiceFlow <contact@serviceflow.agency>',
      to: validatedData.email,
      subject: 'Dziękujemy za kontakt z ServiceFlow',
      text: userEmailContent,
    });

    return NextResponse.json(
      { message: 'Wiadomość została wysłana pomyślnie' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Nieprawidłowe dane formularza', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Wystąpił błąd podczas wysyłania wiadomości' },
      { status: 500 }
    );
  }
}