import {
  ArrowRight,
  Globe,
  Upload,
  Zap,
  Users,
  Code,
  Palette,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/favicon_io/android-chrome-512x512.png"
              alt="R-Icing"
              className="w-8 h-8 object-contain rounded-lg flex items-center"
              width={32}
              height={32}
            />

            <span className="text-xl font-bold text-foreground">R-Icing</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/dashboard"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Create Your Portfolio in Minutes
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Build Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Dynamic Portfolio{" "}
            </span>
            Instantly
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Upload your data, get a unique URL, and showcase your work to the
            world. No coding required – just your creativity and our platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: "default",
                size: "lg",
                className:
                  "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3",
              })}
            >
              Create Your Portfolio
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/user/ayush9547"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
              })}
            >
              View Examples
            </Link>
          </div>
        </div>
      </section>
      <Separator className="my-12" />
      {/* How It Works */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to get your professional portfolio online
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                1. Upload Your Data
              </h3>
              <p className="text-muted-foreground">
                Fill out our simple form with your bio, projects, blogs, and
                social links
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                2. We Generate Your Site
              </h3>
              <p className="text-muted-foreground">
                Our platform automatically creates a beautiful, responsive
                portfolio for you
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                3. Share Your Unique URL
              </h3>
              <p className="text-muted-foreground">
                Get a personalized URL to share with employers, clients, and
                your network
              </p>
            </div>
          </div>
        </div>
      </section>
      <Separator className="my-12" />
      {/* Features */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features to showcase your work and skills professionally
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Personal Branding
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Showcase your bio, profile image, and personal story in a
                  professional layout
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Code className="w-5 h-5 mr-2 text-purple-600" />
                  Project Showcase
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Display your projects with descriptions, images, and live
                  links
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Globe className="w-5 h-5 mr-2 text-green-600" />
                  Social Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect all your social profiles and professional networks in
                  one place
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Palette className="w-5 h-5 mr-2 text-orange-600" />
                  Tech Stack Display
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Organize and display your technical skills with interactive
                  tabs
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                  Instant Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Update your portfolio anytime and see changes reflected
                  immediately
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <ArrowRight className="w-5 h-5 mr-2 text-red-600" />
                  Mobile Responsive
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your portfolio looks perfect on all devices - desktop, tablet,
                  and mobile
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Portfolio?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already created their
            dynamic portfolios. Start building yours today – it's free and takes
            less than 10 minutes.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3"
          >
            Get Started Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-gray-400">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Image
              src="/favicon_io/android-chrome-512x512.png"
              alt="R-Icing"
              width={32}
              height={32}
              className="w-8 h-8 object-contain rounded-lg flex items-center"
            />
            <span className="text-lg font-bold text-white">R-Icing</span>
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} R-Icing. Create your dynamic
            portfolio today.
          </p>
        </div>
      </footer>
    </div>
  );
}
