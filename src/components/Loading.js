import React from 'react'
import '../styles/Loading.css'

export default function Loading() {
    return (
      <div className="spinner-container flex flex-col">
        <div className="loading-spinner mb-2">
        </div>
        <h1 className='font-ad text-lg'>AI is Analyzing Your Face...</h1>
      </div>
    );
  }
