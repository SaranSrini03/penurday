// components/NebulaEffects.jsx
export default function NebulaEffects({  }) {

  return (
    <>
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-[#3a2a7c] to-[#2b97b8] opacity-20 blur-[100px] max-sm:hidden" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-[#8c70cc] to-[#2b97b8] opacity-15 blur-[100px] max-sm:hidden" />
    </>
  );
}