"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BookOpen,
  Send,
  Settings,
  Brain,
  Sparkles,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Home,
  Library,
  GraduationCap,
} from "lucide-react"

export default function AuraLearnDashboard() {
  const [stressLevel, setStressLevel] = useState([3])
  const [bionicMode, setBionicMode] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "Hello! I'm Aura AI, your learning companion. How can I help you today?" },
  ])
  const [inputMessage, setInputMessage] = useState("")

  // Sample reading content
  const readingContent = `The process of learning is fundamentally about creating new neural pathways in your brain. When you encounter new information, your neurons form connections that strengthen with repetition and practice. This neuroplasticity allows your brain to adapt and grow throughout your entire life. Understanding how your brain works can help you develop more effective study strategies and improve your ability to retain information.`

  // Bionic Reading transformation
  const applyBionicReading = (text: string) => {
    if (!bionicMode) return text

    return text.split(" ").map((word, idx) => {
      const boldLength = Math.ceil(word.length / 2)
      const boldPart = word.slice(0, boldLength)
      const normalPart = word.slice(boldLength)

      return (
        <span key={idx}>
          <strong>{boldPart}</strong>
          {normalPart}{" "}
        </span>
      )
    })
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    setChatMessages([
      ...chatMessages,
      { role: "user", content: inputMessage },
      {
        role: "assistant",
        content: "I understand you're working on that topic. Let me help break it down into manageable pieces...",
      },
    ])
    setInputMessage("")
  }

  // Adaptive UI based on stress level
  const isHighStress = stressLevel[0] >= 7
  const isMediumStress = stressLevel[0] >= 4 && stressLevel[0] < 7

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">AuraLearn</h1>
              <p className="text-sm text-muted-foreground">Your AI Learning Companion</p>
            </div>
          </div>

          {!isHighStress && (
            <nav className="flex items-center gap-6">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden md:inline">Home</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Library className="h-4 w-4" />
                <span className="hidden md:inline">Library</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden md:inline">Progress</span>
              </Button>
            </nav>
          )}

          {!isHighStress && (
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline">Settings</span>
            </Button>
          )}
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden">
          <div className="flex h-full flex-col p-6 gap-6">
            {/* Stress Level Control */}
            <Card className="p-6 bg-card border-border">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="mb-4 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold text-card-foreground">Stress Level: {stressLevel[0]}/10</h2>
                  </div>
                  <Slider
                    value={stressLevel}
                    onValueChange={setStressLevel}
                    max={10}
                    min={1}
                    step={1}
                    className="mb-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    {isHighStress && "High stress detected. UI simplified for focus."}
                    {isMediumStress && "Moderate stress. Some features hidden for clarity."}
                    {!isHighStress && !isMediumStress && "Low stress. All features available."}
                  </p>
                </div>

                {!isHighStress && (
                  <div className="flex flex-col gap-2">
                    <Button
                      variant={bionicMode ? "default" : "outline"}
                      size="sm"
                      onClick={() => setBionicMode(!bionicMode)}
                      className="gap-2 whitespace-nowrap"
                    >
                      <Sparkles className="h-4 w-4" />
                      Bionic Reading
                    </Button>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {bionicMode ? (
                        <>
                          <CheckCircle2 className="h-3 w-3" />
                          Enabled
                        </>
                      ) : (
                        "Disabled"
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Reading Pane */}
            <Card className="flex-1 overflow-hidden bg-card border-border">
              <div className="flex h-full flex-col">
                <div className="border-b border-border px-6 py-4 bg-muted/30">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-card-foreground">Understanding Neuroplasticity</h3>
                  </div>
                  {!isHighStress && (
                    <p className="mt-1 text-sm text-muted-foreground">Chapter 3: How Learning Changes Your Brain</p>
                  )}
                </div>

                <ScrollArea className="flex-1 px-6 py-6">
                  <div className="prose prose-lg max-w-none">
                    <p
                      className="leading-relaxed text-card-foreground"
                      style={{ fontSize: isHighStress ? "1.125rem" : "1rem", lineHeight: isHighStress ? "1.8" : "1.7" }}
                    >
                      {applyBionicReading(readingContent)}
                    </p>

                    {!isHighStress && (
                      <>
                        <h4 className="mt-6 mb-3 text-lg font-semibold text-card-foreground">Key Takeaways:</h4>
                        <ul className="space-y-2 text-card-foreground">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 mt-0.5 text-accent shrink-0" />
                            <span>Your brain can form new connections throughout life</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 mt-0.5 text-accent shrink-0" />
                            <span>Repetition strengthens neural pathways</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 mt-0.5 text-accent shrink-0" />
                            <span>Understanding brain function improves learning strategies</span>
                          </li>
                        </ul>
                      </>
                    )}
                  </div>
                </ScrollArea>

                {!isHighStress && (
                  <div className="border-t border-border px-6 py-4 flex gap-3">
                    <Button variant="outline" size="sm">
                      Previous
                    </Button>
                    <Button variant="default" size="sm" className="flex-1">
                      Continue Reading
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </main>

        {/* AI Chat Sidebar */}
        <aside className="w-96 border-l border-border bg-sidebar">
          <div className="flex h-full flex-col">
            {/* Chat Header */}
            <div className="border-b border-sidebar-border bg-sidebar-accent px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
                  <MessageSquare className="h-5 w-5 text-sidebar-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-sidebar-foreground">Aura AI</h3>
                  <p className="text-xs text-muted-foreground">Always here to help</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="flex-1 px-4 py-4">
              <div className="space-y-4">
                {chatMessages.map((message, idx) => (
                  <div key={idx} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    {message.role === "assistant" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                        <Brain className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-sidebar-accent text-sidebar-foreground"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Chat Input */}
            <div className="border-t border-sidebar-border p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask Aura anything..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 bg-sidebar border-sidebar-border text-sidebar-foreground placeholder:text-muted-foreground"
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  className="shrink-0 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {!isHighStress && (
                <p className="mt-2 text-xs text-muted-foreground text-center">
                  Press Enter to send • Aura learns with you
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
