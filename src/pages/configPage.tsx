import React from 'react'
import Header from '../components/header'
import ConfigForm from '../components/config-form'

export default function ConfigPage() {
   return (
      <>
         <Header />
         <div className="container">
         <ConfigForm />
         </div>
      </>
   )
}
