import React from "react";

import {
  ArrowRight,
  UserPlus,
  FileCheck,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@mui/material";
import Footer from "@/components/section/Footer";
import AppLayout from "@/components/layout/AppLayout";
import AppNavBar from "@/components/navbar/AppNavBar";

export default function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: "Create an Account",
      description:
        "Sign up in minutes using your basic details. Your dashboard is instantly ready once you’re in.",
    },
    {
      icon: FileCheck,
      title: "Complete KYC",
      description:
        "Verify your identity securely to unlock all features and ensure a safe ecosystem for everyone.",
    },
    {
      icon: CreditCard,
      title: "Add & Manage Services",
      description:
        "Access services, manage subscriptions, and track everything from one simple interface.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Usage",
      description:
        "All actions are protected with enterprise‑grade security and real‑time monitoring.",
    },
  ];

  return (
    <AppLayout>
      <AppNavBar />
      <div className="w-full px-6 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h1 className="text-3xl font-semibold tracking-tight">
            How It Works
          </h1>
          <p className="text-muted-foreground mt-3 text-base">
            A simple, transparent process designed to get you started quickly
            and keep things effortless.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative"
            >
              <Card className="h-full rounded-2xl shadow-sm">
                <CardContent className="p-6 flex flex-col items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>

              {index !== steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto text-center mt-14"
        >
          <p className="text-sm text-muted-foreground">
            Need help at any step? Our support team and in‑app guidance are
            always there to assist you.
          </p>
        </motion.div>
      </div>
      <Footer />
    </AppLayout>
  );
}
