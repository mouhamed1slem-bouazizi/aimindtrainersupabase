import { GameLibrary } from "@/components/games/game-library"
import { SearchInput } from "@/components/ui/search-input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DomainFilter } from "@/components/games/domain-filter"

export default function GamesPage() {
  return (
    <div className="container px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Game Library</h1>
      <SearchInput placeholder="Search games..." />

      <DomainFilter />

      <Tabs defaultValue="all">
        <TabsList className="grid grid-cols-3 h-auto">
          <TabsTrigger value="all" className="text-xs py-2">
            All Games
          </TabsTrigger>
          <TabsTrigger value="recommended" className="text-xs py-2">
            Recommended
          </TabsTrigger>
          <TabsTrigger value="favorites" className="text-xs py-2">
            Favorites
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <GameLibrary />
        </TabsContent>
        <TabsContent value="recommended" className="mt-4">
          <GameLibrary recommended={true} />
        </TabsContent>
        <TabsContent value="favorites" className="mt-4">
          <GameLibrary favorites={true} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
