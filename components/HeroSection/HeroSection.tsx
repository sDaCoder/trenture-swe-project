"use client"
import { motion } from 'motion/react'
import { Button } from '../ui/button'
import Link from 'next/link'

const HeroSection = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="md:text-9xl font-boldtext-center font-serif text-5xl italic">
          Trenture®
        </div>
        <div className="font-extralight text-base md:text-4xlpy-4">
          Plan smart, trip smart
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button asChild>
            <Link href="/login">Plan your trip</Link>
          </Button>
          <Button variant={"outline"}>Join as a agent</Button>
        </div>
      </motion.div>
    </>
  )
}

export default HeroSection
