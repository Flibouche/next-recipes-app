import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/', '/recipe', '/recipe(.*)', '/blog', '/ingredient, /ingredient(.*)']);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

// Middleware pour protéger les routes privées
// export default clerkMiddleware(async (auth, request) => {
//     const authData = await auth()

//     // Check si la route est admin et si l'utilisateur n'est pas admin
//     if (isAdminRoute(request) && (authData).sessionClaims?.metadata?.role !== 'admin') {
//         const url = new URL('/', request.url)
//         return NextResponse.redirect(url)
//     }

//     // Check si la route est publique et si l'utilisateur est connecté
//     if (!isPublicRoute(request) && !authData.userId) {
//         return new Response("Unauthorized", { status: 401 })
//     }
// })

export default clerkMiddleware();

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}