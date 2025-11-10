'use server'

import {prisma} from "../../../lib/db"
import { revalidatePath } from "next/cache"
import {z} from 'zod'

const input = z.object({title:z.string().trim().min(1).max(100)});

export async function add(formData: FormData){
  const parsed = input.safeParse({title:String(formData.get('title') ?? '')})
  if(parsed.success) {
    await prisma.todo.create({data:{title:parsed.data.title}})
    revalidatePath('/todo')
  }
}

export async function toggle(formData: FormData){
  const id = String(formData.get('id') ?? '')
  const t = await prisma.todo.findUnique({where:{id}})
  if(!t) return
  await prisma.todo.update({where:{id},data:{completed: !t.completed}})
  revalidatePath('/todo')
}

export async function remove(formData: FormData){
  const id = String(formData.get('id') ?? '')
  await prisma.todo.delete({where:{id}}).catch(()=>{})
  revalidatePath('/todo')
}