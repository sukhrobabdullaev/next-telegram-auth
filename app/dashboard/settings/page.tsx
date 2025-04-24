"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash, UserPlus } from "lucide-react"

export default function SettingsPage() {
  const [telegramToken, setTelegramToken] = useState("")
  const [telegramGroupId, setTelegramGroupId] = useState("")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [newModeratorEmail, setNewModeratorEmail] = useState("")
  const [newModeratorName, setNewModeratorName] = useState("")

  const [moderators, setModerators] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", active: true },
    { id: 2, name: "Jane Smith", email: "jane@example.com", active: true },
  ])

  const handleSaveTelegramSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your Telegram notification settings have been updated.",
    })
  }

  const handleAddModerator = () => {
    if (!newModeratorEmail || !newModeratorName) {
      toast({
        title: "Error",
        description: "Please provide both name and email for the new moderator.",
        variant: "destructive",
      })
      return
    }

    const newModerator = {
      id: moderators.length + 1,
      name: newModeratorName,
      email: newModeratorEmail,
      active: true,
    }

    setModerators([...moderators, newModerator])
    setNewModeratorName("")
    setNewModeratorEmail("")

    toast({
      title: "Moderator added",
      description: `${newModeratorName} has been added as a moderator.`,
    })
  }

  const handleRemoveModerator = (id: number) => {
    setModerators(moderators.filter((mod) => mod.id !== id))
    toast({
      title: "Moderator removed",
      description: "The moderator has been removed from the system.",
    })
  }

  const toggleModeratorStatus = (id: number) => {
    setModerators(moderators.map((mod) => (mod.id === id ? { ...mod, active: !mod.active } : mod)))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Telegram Integration</CardTitle>
            <CardDescription>Configure your Telegram bot to receive order notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token">Bot Token</Label>
              <Input
                id="token"
                placeholder="Enter your Telegram bot token"
                value={telegramToken}
                onChange={(e) => setTelegramToken(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">You can get a bot token from @BotFather on Telegram.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="group-id">Group ID</Label>
              <Input
                id="group-id"
                placeholder="Enter your Telegram group ID"
                value={telegramGroupId}
                onChange={(e) => setTelegramGroupId(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                The ID of the group where order notifications will be sent.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              <Label htmlFor="notifications">Enable order notifications</Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveTelegramSettings}>Save Telegram Settings</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Moderator Management</CardTitle>
            <CardDescription>Add or remove moderators who can access the admin panel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Moderator
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Moderator</DialogTitle>
                  <DialogDescription>Add a new moderator who will have access to the admin panel.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="mod-name">Name</Label>
                    <Input
                      id="mod-name"
                      placeholder="Enter moderator name"
                      value={newModeratorName}
                      onChange={(e) => setNewModeratorName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mod-email">Email</Label>
                    <Input
                      id="mod-email"
                      type="email"
                      placeholder="Enter moderator email"
                      value={newModeratorEmail}
                      onChange={(e) => setNewModeratorEmail(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddModerator}>Add Moderator</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {moderators.map((moderator) => (
                    <TableRow key={moderator.id}>
                      <TableCell className="font-medium">{moderator.name}</TableCell>
                      <TableCell>{moderator.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={moderator.active}
                            onCheckedChange={() => toggleModeratorStatus(moderator.id)}
                          />
                          <span>{moderator.active ? "Active" : "Inactive"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveModerator(moderator.id)}>
                          <Trash className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
