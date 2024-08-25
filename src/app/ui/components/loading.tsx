


export const Loading = ({status}: {status: string}) => {
  return (
    <div className="flex flex-col space-y-3 place-items-center">
      <div className="flex place-items-center border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600"/>
      <p className="flex place-items-center text-white">
        {status}
      </p>
    </div>
    
  )
} 

