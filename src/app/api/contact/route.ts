import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Walidacja danych
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Imię, email i wiadomość są wymagane' },
        { status: 400 }
      );
    }
    
    // Zapis do Supabase
    const { error } = await supabase
      .from('contact_forms')
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          service_type: data.service_type || null,
          message: data.message,
          status: 'new'
        }
      ]);
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Nie udało się zapisać formularza' },
        { status: 500 }
      );
    }
    
    // Tutaj możesz dodać kod do wysyłki powiadomienia email, np. poprzez SendGrid, Mailgun, itp.
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera' },
      { status: 500 }
    );
  }
}