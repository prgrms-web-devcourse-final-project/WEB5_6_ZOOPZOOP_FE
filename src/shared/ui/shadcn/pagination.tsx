import * as React from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
  ChevronsRight,
  ChevronsLeft
} from 'lucide-react'

import { cn } from '@/shared/lib/index'
import { Button, buttonVariants } from './button'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="pagination-item"
      {...props}
    />
  )
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'>

function PaginationLink({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? 'pagination' : 'ghost',
          size
        }),
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="이전 페이지로 이동"
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      {...props}>
      <ChevronLeftIcon />
    </PaginationLink>
  )
}
function PaginationFirst({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="첫 번째 페이지로 이동"
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      {...props}>
      <ChevronsLeft />
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="다음 페이지로 이동"
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      {...props}>
      <ChevronRightIcon />
    </PaginationLink>
  )
}
function PaginationLast({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="마지막 페이지로 이동"
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      {...props}>
      <ChevronsRight />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}>
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast
}
