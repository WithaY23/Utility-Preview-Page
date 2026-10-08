import Login from "./Login"
import Signup from "./Signup"
import type { ReactNode } from "react"
import { useEffect, useRef} from 'react'
import { useAuthModal } from "../util"
import { createPortal } from "react-dom"
type AccountModalProps = {
   children : ReactNode, 

   onClose : () => void

}
export default function AccountModalContainer() // if/what the modal displays
{
    const {isOpen,authParamValue, deleteAuthParam} = useAuthModal()
    return(
        isOpen ? <AccountModal onClose={() => {deleteAuthParam()}}>
            {authParamValue === 'signin' ? <Login /> : <Signup />}
        </AccountModal> : null
    )
}
function AccountModal({ //purely the display of the modal
   children,
   onClose
}: AccountModalProps)
{
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const panelRef = useRef<HTMLElement>(null)

    useEffect(() => {
            // closeButtonRef.current?.focus()
    
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    event.preventDefault()
                    onClose()
                    return
                }
                const focusableElements = panelRef.current?.querySelectorAll<HTMLElement>(
                'button:not([disabled]), input:not([disabled])',
            )

            if (!focusableElements?.length) {
                return
            }

            
            if (event.key === "Tab")
            {
                event.preventDefault()
                const currentIndex = Array.from(focusableElements).indexOf(
                document.activeElement as HTMLElement,
                )
                const nextIndex = event.shiftKey
                    ? currentIndex <= 0
                        ? focusableElements.length - 1
                        : currentIndex - 1
                    : currentIndex === -1 || currentIndex === focusableElements.length - 1
                        ? 0
                        : currentIndex + 1

                focusableElements[nextIndex]?.focus()
            }
            
    
            }
    
            document.addEventListener('keydown', handleKeyDown)
    
            return () => {
                document.removeEventListener('keydown', handleKeyDown)
            }
        }, [onClose])
    const modalContent= (<div className="login-modal">
        <section
            ref={panelRef}
            className="login-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-modal-heading"
        >
                <button
                    ref={closeButtonRef}
                    type="button"
                    className="login-modal__close"
                    aria-label="Close account dialog"
                    onClick={(e) => {e.stopPropagation(); onClose(); }}
                >
                    <span aria-hidden="true">×</span>
                </button>
            {children}
        </section>
    </div>)
    return createPortal(modalContent,document.body)
}
