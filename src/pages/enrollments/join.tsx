import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from '@refinedev/react-hook-form'
import { useCreate, useGetIdentity } from '@refinedev/core'
import { useNavigate } from 'react-router'

import { CreateView } from '@/components/refine-ui/views/create-view'
import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb'
import { Form, FormItem, FormLabel, FormField, FormControl, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import type { User } from '@/types'

const joinSchema = z.object({
  inviteCode: z.string().min(3, "Invite code is required")
})

type JoinFormValues = z.infer<typeof joinSchema>

const EnrollmentJoin = () => {
  const navigate = useNavigate()
  const {
    mutateAsync: joinEnrollment,
    mutation: { isPending },
  } = useCreate()

  const { data: currentUser } = useGetIdentity<User>()

  const form = useForm<JoinFormValues>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      inviteCode: ""
    }
  })

  const inviteCode = form.watch("inviteCode")

  const onSubmit = async (values: JoinFormValues) => {
    if (!currentUser?.id) return

    const response = await joinEnrollment({
      resource: "enrollments/join",
      values: {
        inviteCode: values.inviteCode,
        studentId: currentUser.id
      },
    })

    navigate("/enrollment/confirm", {
      state: {
        enrollment: response?.data,
      }
    })
  }

  const isSubmitDisabled = isPending || !currentUser?.id || !inviteCode


  return (
    <CreateView className="class-view">
      <Breadcrumb />

      <h1 className="page-title">Join by Invite Code</h1>
      <div className="intro-row">
        <p>Enter the invite code provided by your instructor.</p>
      </div>

      <Separator />

      <div className="my-4 flex items-center">
        <Card className="class-form-card">
          <CardHeader className="reletive z-10">
            <CardTitle className="text-2xl pb-0 font-bold text-gradient-orange">
                Join Class
            </CardTitle>
          </CardHeader>

          <Separator />

          <CardContent className="mt-7">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField 
                  control={form.control}
                  name="inviteCode"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>
                        Invite Code <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter invite code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Student</FormLabel>
                  <FormControl>
                    <Input 
                      value={currentUser?.email ?? "Not signed in"}
                      readOnly
                    />
                  </FormControl>
                </FormItem>

                <Button>
                  {isPending ? "Joining..." : "Join Class" }
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </CreateView>
  )
}

export default EnrollmentJoin