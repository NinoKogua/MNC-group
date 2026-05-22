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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      alert(info.successMessage || 'Message sent!')
    }, 1500)
  }

  const inputClass =
    'w-full border border-gray-200 rounded-xl p-4 outline-none focus:border-green-600 transition-colors bg-white font-medium text-gray-700 placeholder:text-gray-300'

  return (
    <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl border border-gray-50 h-full font-kirovi">
      {info.formBadge && (
        <div className="inline-block bg-green-50 text-green-primary text-xs font-bold px-3 py-1 rounded-lg mb-4">
          ● {info.formBadge}
        </div>
      )}

      {info.formTitle && (
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">{info.formTitle}</h2>
      )}

      {info.formDescription && (
        <p className="text-gray-400 font-medium mb-8 font-mtavruli">{info.formDescription}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder={info.namePlaceholder || ''}
          className={inputClass}
          required
        />
        <input
          type="email"
          placeholder={info.emailPlaceholder || ''}
          className={inputClass}
          required
        />
        <input
          type="tel"
          placeholder={info.phonePlaceholder || ''}
          className={inputClass}
          required
        />
        <textarea
          placeholder={info.messagePlaceholder || ''}
          rows={8}
          className={inputClass}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-green-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-green-900 transition-all active:scale-95 disabled:bg-gray-400"
        >
          {loading ? info.loadingButtonText || 'Loading...' : info.submitButtonText || 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default ContactForm
