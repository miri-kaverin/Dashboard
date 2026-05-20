import {
  IconChartBar,
  IconPackage,
  IconSettings,
  IconShoppingCart,
  IconUsers,
} from "@tabler/icons-react"

export const navItems = [
  { title: "Overview", href: "/", icon: IconChartBar },
  { title: "Products", href: "/products", icon: IconPackage },
  { title: "Customers", href: "/customers", icon: IconUsers },
  { title: "Orders", href: "/orders", icon: IconShoppingCart },
  { title: "Settings", href: "/settings", icon: IconSettings },
] as const
