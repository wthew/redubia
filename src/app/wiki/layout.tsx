import { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
    modal: ReactNode
}
export const dynamic = 'force-dynamic'
export default function Layout({ modal, children } : Props) {
    return <>
     {children}
     {modal}
    </>
}