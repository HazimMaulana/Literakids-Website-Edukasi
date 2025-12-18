import svgPaths from "./svg-qkd604vz44";
import imgLoginPagePenuh1 from "figma:asset/7f07e636261cc6d50c15e379e66d89b2eb464776.png";

function Group() {
  return (
    <div className="absolute contents left-[194px] top-[313.85px]">
      <div className="absolute bg-[#fefad4] h-[10px] left-[194px] top-[314px] w-[67px]" />
      <div className="absolute flex h-[10.293px] items-center justify-center left-[196.98px] top-[313.85px] w-[62.047px]" style={{ "--transform-inner-width": "59.421875", "--transform-inner-height": "9.59375" } as React.CSSProperties}>
        <div className="flex-none rotate-[359.729deg]">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative text-[8px] text-black text-nowrap">SDN 5 Taliwang</p>
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute h-[899px] left-0 top-0 w-[457px]" data-name="loginPagePenuh 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[100.67%] left-[-0.05%] max-w-none top-[-0.67%] w-[100.1%]" src={imgLoginPagePenuh1} />
        </div>
      </div>
      <Group />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[117px] top-[230px]">
      <div className="absolute bg-black h-[40px] left-[117px] rounded-[50px] top-[230px] w-[124px]" />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[147px] not-italic text-[20px] text-nowrap text-white top-[238px]">Masuk</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-[rgba(217,217,217,0.9)] h-[293px] left-[49px] opacity-80 rounded-[40px] top-[301px] w-[358px]">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[55px] not-italic text-[32px] text-black text-nowrap top-[23px]">Selamat Datang</p>
      <div className="absolute bg-white border border-[#acacac] border-solid h-[42px] left-[19px] rounded-[40px] top-[98px] w-[320px]" />
      <div className="absolute bg-white border border-[#acacac] border-solid h-[42px] left-[19px] rounded-[40px] top-[152px] w-[320px]" />
      <Group2 />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[68px] not-italic text-[15px] text-black text-nowrap top-[110px]">Nama</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[68px] not-italic text-[15px] text-black text-nowrap top-[164px]">Sandi</p>
      <div className="absolute inset-[37.54%_85.75%_56.31%_9.22%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path clipRule="evenodd" d={svgPaths.p4db3f80} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[55.97%_85.75%_37.88%_9.22%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <g id="Vector">
              <path d={svgPaths.p39f58d80} fill="var(--fill-0, #D9D9D9)" />
              <path d={svgPaths.p33c00e00} stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Wireframe() {
  return (
    <div className="bg-white relative size-full" data-name="Wireframe - 2">
      <Group1 />
      <Frame />
    </div>
  );
}