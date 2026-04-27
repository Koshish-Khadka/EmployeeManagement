import React from 'react'

const LeaveForm = () => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-xl md:max-w-3xl max-h-[85vh] overflow-y-auto p-6">
      <div className="flex justify-between items-start p-3">
        <div>
          <h2>Apply for Leave</h2>
          <p>Submit your leave request here.</p>
        </div>
        <div>
          <button>
            <X className="h-4 w-4 " />
          </button>
        </div>
      </div>
    </div>
  )
}

export default LeaveForm