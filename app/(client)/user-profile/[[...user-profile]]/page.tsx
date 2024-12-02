'use client'

import { UserProfile } from '@clerk/nextjs'

const UserProfilePage = () => (
    <section className='container flex w-full justify-center py-10'>
        <UserProfile path="/user-profile" routing="path" appearance={{
            elements: {
                rootBox: 'w-full',
                cardBox: 'w-full',
                headerTitle: 'text-2xl font-bold',
            },
        }}>
            <UserProfile.Page label="Informations" labelIcon="O" url="terms">
                <div>
                    <h1>Custom Terms Page</h1>
                    <p>This is the custom terms page</p>
                </div>
            </UserProfile.Page>
        </UserProfile>
    </section>
)

export default UserProfilePage