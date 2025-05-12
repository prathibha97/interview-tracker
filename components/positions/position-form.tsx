// components/positions/position-form.tsx (continued)

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { createPosition, updatePosition } from '@/actions/position';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Position } from '@/lib/generated/prisma';

// Form schema
const positionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  department: z.string().optional(),
  workflowId: z.string().optional(),
  isActive: z.boolean().default(true),
});

type PositionFormValues = z.infer<typeof positionSchema>;

interface PositionFormProps {
  position?: Position | null;
  isEdit?: boolean;
}

export function PositionForm({ position, isEdit = false }: PositionFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [workflows, setWorkflows] = useState<
    { id: string; name: string; isDefault: boolean }[]
  >([]);
  const [isLoadingWorkflows, setIsLoadingWorkflows] = useState(true);

  // Fetch workflows
  useEffect(() => {
    async function fetchWorkflows() {
      try {
        const response = await fetch('/api/workflows');

        if (response.ok) {
          const data = await response.json();
          setWorkflows(
            data.map((w: any) => ({
              id: w.id,
              name: w.name,
              isDefault: w.isDefault,
            }))
          );
        }
      } catch (error) {
        console.error('Failed to fetch workflows:', error);
      } finally {
        setIsLoadingWorkflows(false);
      }
    }

    fetchWorkflows();
  }, []);

  // Find default workflow
  const defaultWorkflow = workflows.find((w) => w.isDefault);

  // Default values for the form
  const defaultValues: Partial<PositionFormValues> = {
    title: position?.title || '',
    department: position?.department || '',
    workflowId: position?.workflowId || defaultWorkflow?.id || '',
    isActive: position?.isActive ?? true,
  };

  const form = useForm<PositionFormValues>({
    resolver: zodResolver(positionSchema),
    defaultValues,
  });

  // Update the workflowId field when the default workflow is loaded
  useEffect(() => {
    if (!position?.workflowId && defaultWorkflow && !isEdit) {
      form.setValue('workflowId', defaultWorkflow.id);
    }
  }, [defaultWorkflow, form, position?.workflowId, isEdit]);

  async function onSubmit(values: PositionFormValues) {
    setIsSubmitting(true);
    setError(null);

    try {
      if (isEdit && position) {
        // Update existing position
        await updatePosition(position.id, values);
        router.push(`/dashboard/positions`);
        router.refresh();
      } else {
        // Create new position
        await createPosition(values);
        router.push(`/dashboard/positions`);
        router.refresh();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to save position. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {error && (
          <Alert variant='destructive'>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Software Engineer' {...field} />
              </FormControl>
              <FormDescription>The title of the position</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='department'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <Input
                  placeholder='Engineering'
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormDescription>
                The department this position belongs to
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='workflowId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interview Workflow</FormLabel>
              <Select
                disabled={isLoadingWorkflows}
                onValueChange={field.onChange}
                value={field.value || 'None'}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a workflow' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='None'>None</SelectItem>
                  {isLoadingWorkflows ? (
                    <SelectItem value='loading' disabled>
                      Loading workflows...
                    </SelectItem>
                  ) : (
                    workflows.map((workflow) => (
                      <SelectItem key={workflow.id} value={workflow.id}>
                        {workflow.name} {workflow.isDefault ? '(Default)' : ''}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormDescription>
                The interview process for this position
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='isActive'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>Active</FormLabel>
                <FormDescription>
                  Is this position currently active and open for candidates?
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className='flex items-center justify-end space-x-4'>
          <Button
            type='button'
            variant='outline'
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting && (
              <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
            )}
            {isEdit ? 'Update Position' : 'Create Position'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
