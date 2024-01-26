import { paths } from '@/constants';

export const footerNavLinks = [
    {
        id: 'blog',
        label: 'Blog',
        url: paths.blog,
    },
    {
        id: 'faq',
        label: 'F.A.Q.',
        url: paths.faq,
    },
] as const;