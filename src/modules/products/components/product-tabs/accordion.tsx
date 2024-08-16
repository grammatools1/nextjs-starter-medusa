import { Text, clx } from "@medusajs/ui"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import React, { ReactNode } from "react"

type AccordionSingleProps = AccordionPrimitive.AccordionSingleProps
type AccordionMultipleProps = AccordionPrimitive.AccordionMultipleProps

type AccordionItemProps = AccordionPrimitive.AccordionItemProps & {
  title: string
  subtitle?: string
  description?: string
  required?: boolean
  tooltip?: string
  forceMountContent?: boolean
  headingSize?: "small" | "medium" | "large"
  customTrigger?: React.ReactNode
  complete?: boolean
  active?: boolean
  triggerable?: boolean
  children: React.ReactNode
}

type AccordionProps = AccordionSingleProps | AccordionMultipleProps & React.RefAttributes<HTMLDivElement>

const Accordion: React.FC<AccordionProps> & {
  Item: React.FC<AccordionItemProps>
} = React.forwardRef<HTMLDivElement, AccordionProps>(({ children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Root ref={ref} {...props}>
      {children}
    </AccordionPrimitive.Root>
  )
})

Accordion.Item = ({ title, subtitle, description, children, className, ...props }: AccordionItemProps) => {
  return (
    <AccordionPrimitive.Item {...props} className={clx("border-grey-20 group border-t last:mb-0 last:border-b py-3", className)}>
      <AccordionPrimitive.Header className="px-1">
        <div className="flex flex-col">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <Text className="text-ui-fg-subtle text-sm">{title}</Text>
            </div>
            <AccordionPrimitive.Trigger>
              {/* Render custom trigger or default */}
            </AccordionPrimitive.Trigger>
          </div>
          {subtitle && <Text as="span" size="small" className="mt-1">{subtitle}</Text>}
        </div>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content className="px-1">
        <div>{description && <Text>{description}</Text>}</div>
        <div className="w-full">{children}</div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  )
}

export default Accordion
