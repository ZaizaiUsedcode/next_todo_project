'use client'

import { useState, useEffect, useMemo } from "react";
import { json } from "stream/consumers";
type Todo ={
    id: string;
    title: string;
    done: boolean

}

type Filter = 'all' | 'active' | 'done';
const STORAGE_KEY = 'todos'

export default function TodoClient(){
    const [todos, setTodos] = useState<Todo []>([]);
    const [filter, setFilter] = useState<Filter>('all');

    useEffect(() =>{
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)?? '[]')
            if(Array.isArray(saved)) setTodos(saved)

        } catch {

        }
    },[])

    useEffect(()=>{
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    },[todos])

    const add = (title: string) => setTodos(t => [...t,{id:crypto.randomUUID(),title, done:false}]);
    const toggle = (id: string) => setTodos(t=> t.map(x=>(x.id ===id? {...x,done: !x.done}:x)));
    const remove = (id: string) => setTodos(t=> t.filter(x=>x.id !== id));
    const clearCompleted = () => setTodos(t=>t.filter(x => !x.done));

    const list = useMemo(() =>{
        if(filter ==='active') return todos.filter(x=>!x.done);
        if (filter ==='done') return todos.filter(x=> x.done);
        return todos
    },[todos, filter])

    return (
    <main className="min-h-dvh bg-zinc-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl mx-auto">
        <div className="rounded-2xl bg-white p-6 shadow">
          <h1 className="text-2xl font-bold text-center">TODO Matic</h1>

          {/* add form */}
          <form
            className="mt-4 flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault()
              const fd = new FormData(e.currentTarget)
              const title = String(fd.get('title') ?? '').trim()
              if (!title) return
              add(title)
              e.currentTarget.reset()
            }}
          >
            <input
              name="title"
              placeholder="Add a task…"
              className="h-11 px-4 rounded-lg border border-zinc-300
                         bg-white placeholder:text-zinc-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add
              </button>

              {/* filters */}
              <div className="ml-auto flex items-center gap-2 text-sm">
                <button type="button"
                        onClick={() => setFilter('all')}
                        className={`px-2 py-1 rounded ${filter==='all' ? 'bg-zinc-100' : ''}`}>
                  All
                </button>
                <button type="button"
                        onClick={() => setFilter('active')}
                        className={`px-2 py-1 rounded ${filter==='active' ? 'bg-zinc-100' : ''}`}>
                  Active
                </button>
                <button type="button"
                        onClick={() => setFilter('done')}
                        className={`px-2 py-1 rounded ${filter==='done' ? 'bg-zinc-100' : ''}`}>
                  Done
                </button>
              </div>
            </div>
          </form>

          {/* list */}
          <ul className="mt-4 divide-y divide-zinc-200">
            {list.length === 0 && (
              <li className="py-6 text-center text-zinc-500 text-sm">
                No items yet.
              </li>
            )}
            {list.map(t => (
              <li key={t.id} className="py-3 flex items-center gap-3">
                <button
                  onClick={() => toggle(t.id)}
                  className={`w-5 h-5 rounded border
                              ${t.done ? 'bg-green-600 border-green-600' : 'bg-white border-zinc-300'}`}
                  aria-label="toggle"
                  title="toggle"
                />
                <span className={t.done ? 'line-through text-zinc-500' : ''}>
                  {t.title}
                </span>
                <button
                  onClick={() => remove(t.id)}
                  className="ml-auto text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          {/* footer actions */}
          {todos.length > 0 && (
            <div className="mt-4 flex items-center text-sm text-zinc-600">
              <span>{todos.filter(t => !t.done).length} items left</span>
              <button onClick={clearCompleted} className="ml-auto hover:underline">
                Clear completed
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )

}