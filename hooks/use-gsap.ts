'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface UseGsapScrollTriggerOptions {
  trigger?: string | Element
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  toggleActions?: string
  pin?: boolean
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
}

export function useGsapScrollTrigger(
  animation: (gsap: typeof import('gsap').gsap) => gsap.core.Timeline | gsap.core.Tween,
  options: UseGsapScrollTriggerOptions = {}
) {
  const triggerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!triggerRef.current) return
    
    const ctx = gsap.context(() => {
      const tween = animation(gsap)
      
      ScrollTrigger.create({
        trigger: options.trigger || triggerRef.current,
        start: options.start || 'top center',
        end: options.end || 'bottom center',
        scrub: options.scrub,
        markers: options.markers || false,
        toggleActions: options.toggleActions || 'play none none reverse',
        pin: options.pin,
        onEnter: options.onEnter,
        onLeave: options.onLeave,
        onEnterBack: options.onEnterBack,
        onLeaveBack: options.onLeaveBack,
        animation: tween,
      })
    }, triggerRef)
    
    return () => ctx.revert()
  }, [animation, options])
  
  return triggerRef
}

export function useParallax(
  yPercent: number = -50,
  options: Partial<UseGsapScrollTriggerOptions> = {}
) {
  const elementRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!elementRef.current) return
    
    const ctx = gsap.context(() => {
      gsap.to(elementRef.current, {
        yPercent,
        ease: 'none',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          ...options,
        },
      })
    })
    
    return () => ctx.revert()
  }, [yPercent, options])
  
  return elementRef
}

export function useTextReveal(
  selector: string,
  options: {
    stagger?: number
    duration?: number
    ease?: string
  } = {}
) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll(selector)
      if (!elements) return
      
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 40,
          filter: 'blur(4px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: options.stagger || 0.1,
          duration: options.duration || 0.8,
          ease: options.ease || 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      )
    }, containerRef)
    
    return () => ctx.revert()
  }, [selector, options])
  
  return containerRef
}

export function useCounterAnimation(
  targetValue: number,
  options: {
    duration?: number
    ease?: string
    suffix?: string
    decimals?: number
  } = {}
) {
  const counterRef = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    if (!counterRef.current) return
    
    const ctx = gsap.context(() => {
      const obj = { value: 0 }
      
      gsap.to(obj, {
        value: targetValue,
        duration: options.duration || 2,
        ease: options.ease || 'power2.out',
        scrollTrigger: {
          trigger: counterRef.current,
          start: 'top 80%',
        },
        onUpdate: () => {
          if (counterRef.current) {
            const formatted = options.decimals 
              ? obj.value.toFixed(options.decimals)
              : Math.floor(obj.value).toLocaleString()
            counterRef.current.textContent = formatted + (options.suffix || '')
          }
        },
      })
    }, counterRef)
    
    return () => ctx.revert()
  }, [targetValue, options])
  
  return counterRef
}
