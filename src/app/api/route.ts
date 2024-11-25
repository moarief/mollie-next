import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
    try {
        const payload = await request.text();
        console.log('Received webhook payload:', payload);
        revalidatePath('/payments');
        return new Response('Webhook successfully received', {
            status: 200,
        });
    } catch (error: any) {
        return new Response(`Webhook error: ${error.message}`, {
            status: 403,
        });
    }
}
