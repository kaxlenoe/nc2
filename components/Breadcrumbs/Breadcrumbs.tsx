import React, { useEffect, useState } from 'react';
import styles from './Breadcrumbs.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { capitalizeFirstLetter } from '@/utils/helpers';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';

type BreadcrumbItem = {
    path: string;
    label: string;
};

interface BreadcrumbsProps {
    current_item_heading?: string;
    custom_url?: {
        path: string;
        label: string;
    }
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ( { current_item_heading, custom_url } ) => {
    const [ breadcrumbs, setBreadcrumbs ] = useState<BreadcrumbItem[]>( [] );
    const pathname = usePathname();
    const router = useRouter();


    useEffect( () => {
        const pathChunks = pathname.split( '/' ).filter( ( i ) => i );
        const breadcrumbItems: BreadcrumbItem[] = pathChunks.map( ( chunk, index ) => {
            const path = `/${ pathChunks.slice( 0, index + 1 ).join( '/' ) }`;
            const label = capitalizeFirstLetter(
                decodeURIComponent( chunk.replace( /-/g, ' ' ) ),
            );
            return { path, label };
        } );
        setBreadcrumbs( breadcrumbItems );
    }, [ pathname ] );

    const handleBreadcrumbClick = ( path: string ) => {
        router.push( path );
    };

    return (
        <div className={ styles.breadcrumbs }>
            <Link
                href='/'
                className={ styles.breadcrumb }
                onClick={ () => revalidatePath( '/' ) }
            >
                Home
            </Link>
            { breadcrumbs.map( ( breadcrumb, index ) => (
                    <React.Fragment key={ breadcrumb.path }>
                        <span className={ styles.separator }> / </span>
                        { index < breadcrumbs.length - 1 ? (
                            <Link
                                className={ styles.breadcrumb }
                                href={ breadcrumb.path }
                                onClick={ () => revalidatePath( breadcrumb.path ) }
                            >
                                { breadcrumb.label }
                            </Link>
                        ) : (
                            <>
                                { custom_url &&
                                    <>
                                    <Link
                                        href={ custom_url.path }
                                        className={ styles.breadcrumb }
                                        onClick={ () => revalidatePath( custom_url.path ) }
                                    >
                                        {custom_url.label}
                                    </Link>
                                    <span className={ styles.separator }> / </span>
                                    </>
                                }

                                <span
                                    className={ styles.currentBreadcrumb }>
                                    { current_item_heading ? current_item_heading : breadcrumb.label }
                                </span>
                            </>
                        ) }
                    </React.Fragment>
                )
            ) }
        </div>
    );
};

export default Breadcrumbs;
