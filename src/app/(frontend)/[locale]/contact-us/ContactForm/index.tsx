'use client'

import React, { useState } from 'react'

type ContactFormInfo = {
  formBadge?: string | null
  formTitle?: string | null
  formDescription?: string | null
  namePlaceholder?: string | null
  emailPlaceholder?: string | null
  phonePlaceholder?: string | null
  messagePlaceholder?: string | null
  submitButtonText?: string | null
  loadingButtonText?: string | null
  successMessage?: string | null
}

type Props = {
  info?: ContactFormInfo
}

const ContactForm = ({ info = {} }: Props) => {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert(info.successMessage || 'Message sent!')
    }, 1500)
  }

  const isFormValid =
    name.trim() !== '' &&
    email.trim() !== '' &&
    phone.trim() !== '' &&
    message.trim() !== ''

  const inputClass = (value: string) =>
    `bg-transparent border rounded-lg px-3 pt-[9px] pb-[4px] outline-none transition-colors text-gray-800 placeholder:text-gray-300 text-sm w-full ${
      value.trim() !== '' ? 'border-green-700' : 'border-gray-300 focus:border-green-800'
    }`

  return (
    <div className="h-full">
      {info.formTitle && (
        <h2 className="font-kirovi text-4xl md:text-5xl text-[#1a2e2a] mb-3 leading-tight">
          {info.formTitle}
        </h2>
      )}

      {info.formDescription && (
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          {info.formDescription}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-gray-400">
              {info.namePlaceholder || 'სახელი'}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass(name)}
              placeholder="გიორგი მაისურაძე"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-gray-400">
              {info.phonePlaceholder || 'ტელეფონი'}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass(phone)}
              placeholder="+995 555 00 00 00"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-gray-400">
              {info.emailPlaceholder || 'ელ-ფოსტა'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass(email)}
              placeholder="example@mail.com"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase tracking-widest text-gray-400">
            {info.messagePlaceholder || 'შეტყობინება'}
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className={`${inputClass(message)} resize-none`}
            placeholder="თქვენი შეტყობინება..."
            required
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="w-full font-kirovi rounded-xl uppercase tracking-widest text-base pt-[8px] pb-[8px] flex items-center justify-center transition-colors duration-300 text-white"
            style={{
              background: loading ? '#9ca3af' : isFormValid ? '#1a2e2a' : '#d1d5db',
              cursor: loading || !isFormValid ? 'not-allowed' : 'pointer',
            }}
          >
            {loading
              ? info.loadingButtonText || 'იგზავნება...'
              : info.submitButtonText || 'გაგზავნა'}
          </button>
        </div>

      </form>
    </div>
  )
}

export default ContactForm