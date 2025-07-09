import { MobileHeader } from "./MobileHeader"
import { DesktopHeader } from "./DesktopHeader"

export const Header = () => {
    const isMobile = window.innerWidth < 768;

    return isMobile ? <MobileHeader></MobileHeader> : <DesktopHeader></DesktopHeader>
}