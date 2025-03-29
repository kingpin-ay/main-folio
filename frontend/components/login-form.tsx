"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { appClient } from "@/lib/client.ts/appClient";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface loginSchem {
  username: string;
  password: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      formData.append("username", value.username);
      formData.append("password", value.password);
      await appClient
        .login(formData)
        .then((res) => {
          console.log(res);
          router.push("/dashboard");
        })
        .catch((err) => {
          console.log("error on login -> ", err);
          toast({
            title: "Login: Failed",
            description: `Login Failed Please Try Again .}`,
          });
        });
    },
    defaultValues: {
      username: "",
      password: "",
    } as loginSchem,
  });
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your User Name below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="userName">User Name</Label>
          <form.Field
            name="username"
            validators={{
              onChange: ({ value }) =>
                value.length < 8
                  ? "User Name must be at least 8 characters long"
                  : undefined,
            }}
          >
            {(field) => {
              return (
                <>
                  <Input
                    id="userName"
                    type="userName"
                    placeholder="admin"
                    required
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length ? (
                    <em>{field.state.meta.errors.join(",")}</em>
                  ) : null}
                </>
              );
            }}
          </form.Field>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) =>
                value.length < 8
                  ? "Password must be at least 8 characters long"
                  : undefined,
            }}
          >
            {(field) => {
              return (
                <>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter Your Password Here"
                    required
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length ? (
                    <em>{field.state.meta.errors.join(",")}</em>
                  ) : null}
                </>
              );
            }}
          </form.Field>
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
    </form>
  );
}
