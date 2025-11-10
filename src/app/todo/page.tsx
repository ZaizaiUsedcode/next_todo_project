import { add,toggle,remove } from "./action"
import {prisma} from "../../../lib/db"

export const metadata ={title: 'TODO Matic'}
export default async function TodoPage(){
  const todos= await prisma.todo.findMany({orderBy:{createdAt:'desc'}})

  return (
    <main className="min-h-dvh bg-zinc-50 py-10">
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="rounded-2xl bg-white p-6 shadow">
          <h1 className="text-2xl font-bold text-center">TODO Matic</h1>

          {/* 新增：Server Action 接收 FormData */}
          <form action={add} className="mt-4 flex flex-col gap-3">
            <input
              name="title"
              placeholder="Add a task…"
              className="h-11 px-4 rounded-lg border border-zinc-300
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button type="submit"
              className="h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
              Add
            </button>
          </form>

          {/* 列表：每个条目的按钮也直接是 Server Action 表单 */}
          <ul className="mt-4 divide-y divide-zinc-200">
            {todos.length === 0 && (
              <li className="py-6 text-center text-zinc-500 text-sm">No items yet.</li>
            )}
            {todos.map(t => (
              <li key={t.id} className="py-3 flex items-center gap-3">
                <form action={toggle}>
                  <input type="hidden" name="id" value={t.id} />
                  <button
                    className={`w-5 h-5 rounded border
                               ${t.completed ? 'bg-green-600 border-green-600' : 'bg-white border-zinc-300'}`}
                    aria-label="toggle"
                    title="toggle"
                  />
                </form>
                <span className={t.completed ? 'line-through text-zinc-500' : ''}>{t.title}</span>
                <form action={remove} className="ml-auto">
                  <input type="hidden" name="id" value={t.id} />
                  <button className="text-sm text-red-600 hover:underline">Delete</button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}