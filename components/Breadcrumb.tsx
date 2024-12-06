"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface BreadCrumbProps {
    separator: string
    listClasses: string
    activeClasses: string
    capitalizeLinks: boolean
}

const Breadcrumb = ({ separator, listClasses, activeClasses, capitalizeLinks }: BreadCrumbProps) => {

    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)

    if (paths === '/') {
        return null;
    }

    return (
        <ul className='container flex flex-row gap-2'>
            {/* Home */}
            <li className={listClasses}>
                <Link href={'/'}>Home</Link>
            </li>

            {/* Separator */}
            {pathNames.length > 0 && separator}

            {/* Pathname */}
            {pathNames.map((link, index) => {
                const href = `/${pathNames.slice(0, index + 1).join('/')}`;
                const itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses;
                const itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link;

                return (
                    <React.Fragment key={index}>
                        <li className={itemClasses}>
                            <Link href={href}>{itemLink}</Link>
                        </li>
                        {pathNames.length !== index + 1 && separator}
                    </React.Fragment>
                )
            })}
        </ul>
    )
}

export default Breadcrumb;