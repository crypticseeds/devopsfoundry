"use client"

import { motion } from "framer-motion"
import { Activity } from "lucide-react"

export function StatusWidget() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="fixed bottom-6 right-6 z-50 hidden md:flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-md shadow-xl"
        >
            <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-medium text-white/50 uppercase tracking-wider">System Status</span>
                <span className="text-xs font-bold text-green-400 flex items-center gap-1">
                    OPERATIONAL <Activity className="h-3 w-3" />
                </span>
            </div>
        </motion.div>
    )
}
