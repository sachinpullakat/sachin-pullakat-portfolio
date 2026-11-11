
const modules = [
  { x: 54, y: 92, title: "COMPUTER VISION", code: "VISION_01" },
  { x: 626, y: 92, title: "MACHINE LEARNING", code: "MODEL_02" },
  { x: 54, y: 474, title: "DATA PROCESSING", code: "DATA_03" },
  { x: 626, y: 474, title: "INTELLIGENT APIs", code: "API_04" },
];

export default function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-1%] top-1/2 z-0 hidden w-[61%] max-w-[900px] -translate-y-1/2 lg:block"
    >
      <div className="relative aspect-[900/700] w-full">
        <div className="absolute inset-[12%] rounded-full bg-blue-500/[0.09] blur-[100px]" />

        <svg
          viewBox="0 0 900 700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="relative h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient id="panelFill" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#17243A" stopOpacity="0.92" />
              <stop offset="1" stopColor="#0B111E" stopOpacity="0.82" />
            </linearGradient>

            <linearGradient id="panelStroke" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#60A5FA" stopOpacity="0.55" />
              <stop offset="1" stopColor="#64748B" stopOpacity="0.12" />
            </linearGradient>

            <linearGradient id="coreFill" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#93C5FD" />
              <stop offset="0.45" stopColor="#3B82F6" />
              <stop offset="1" stopColor="#4338CA" />
            </linearGradient>

            <radialGradient id="coreLight">
              <stop stopColor="#60A5FA" stopOpacity="0.35" />
              <stop offset="0.55" stopColor="#2563EB" stopOpacity="0.12" />
              <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="signalLine">
              <stop stopColor="#60A5FA" stopOpacity="0.02" />
              <stop offset="0.5" stopColor="#93C5FD" stopOpacity="0.9" />
              <stop offset="1" stopColor="#60A5FA" stopOpacity="0.05" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="largeGlow">
              <feGaussianBlur stdDeviation="24" />
            </filter>

            <filter id="panelShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="12" result="blur" />
              <feOffset dy="8" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.28" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <pattern
              id="fineGrid"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M30 0H0V30"
                stroke="#64748B"
                strokeOpacity="0.12"
                strokeWidth="0.7"
              />
            </pattern>

            <clipPath id="visualBounds">
              <rect x="0" y="0" width="900" height="700" rx="12" />
            </clipPath>
          </defs>

          <g clipPath="url(#visualBounds)">
            {/* Background grid and ambient light */}
            <rect width="900" height="700" fill="url(#fineGrid)" opacity="0.6" />

            <ellipse
              cx="450"
              cy="350"
              rx="260"
              ry="240"
              fill="url(#coreLight)"
              filter="url(#largeGlow)"
            />

            {/* Orbital geometry */}
            <g
              stroke="#60A5FA"
              strokeOpacity="0.15"
              strokeDasharray="2 9"
            >
              <ellipse cx="450" cy="350" rx="295" ry="255" />
              <ellipse cx="450" cy="350" rx="250" ry="215" />
              <circle cx="450" cy="350" r="178" />
            </g>

            {/* Architectural connections */}
            <g
              stroke="url(#signalLine)"
              strokeWidth="1.6"
              strokeLinejoin="round"
            >
              <path d="M274 175 L340 175 L340 250 L450 250 L450 282" />
              <path d="M626 175 L560 175 L560 250 L450 250" />
              <path d="M274 550 L340 550 L340 465 L450 465 L450 418" />
              <path d="M626 550 L560 550 L560 465 L450 465" />
            </g>

            {/* Secondary connections */}
            <g
              stroke="#60A5FA"
              strokeOpacity="0.23"
              strokeWidth="1"
              strokeDasharray="4 6"
            >
              <path d="M274 205 L310 205 L310 295" />
              <path d="M626 205 L590 205 L590 295" />
              <path d="M274 520 L310 520 L310 415" />
              <path d="M626 520 L590 520 L590 415" />
            </g>

            {/* Moving signal pulses */}
            <g filter="url(#glow)">
              <circle r="3.5" fill="#BFDBFE">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path="M274 175 L340 175 L340 250 L450 250 L450 282"
                />
              </circle>

              <circle r="3.5" fill="#93C5FD">
                <animateMotion
                  dur="4.8s"
                  repeatCount="indefinite"
                  path="M626 175 L560 175 L560 250 L450 250"
                />
              </circle>

              <circle r="3.5" fill="#BFDBFE">
                <animateMotion
                  dur="4.4s"
                  repeatCount="indefinite"
                  path="M274 550 L340 550 L340 465 L450 465 L450 418"
                />
              </circle>

              <circle r="3.5" fill="#93C5FD">
                <animateMotion
                  dur="5.2s"
                  repeatCount="indefinite"
                  path="M626 550 L560 550 L560 465 L450 465"
                />
              </circle>
            </g>

            {/* Four floating technical modules */}
            {modules.map((module, index) => (
              <g key={module.code} filter="url(#panelShadow)">
                <rect
                  x={module.x}
                  y={module.y}
                  width="220"
                  height="155"
                  rx="12"
                  fill="url(#panelFill)"
                  stroke="url(#panelStroke)"
                  strokeWidth="1"
                />

                <rect
                  x={module.x + 1}
                  y={module.y + 1}
                  width="218"
                  height="153"
                  rx="11"
                  fill="url(#fineGrid)"
                  opacity="0.4"
                />

                {/* Panel heading */}
                <circle
                  cx={module.x + 19}
                  cy={module.y + 22}
                  r="3"
                  fill="#60A5FA"
                  filter="url(#glow)"
                />

                <text
                  x={module.x + 31}
                  y={module.y + 26}
                  fill="#CBD5E1"
                  fontSize="9"
                  fontFamily="monospace"
                  letterSpacing="1.1"
                >
                  {module.title}
                </text>

                <text
                  x={module.x + 200}
                  y={module.y + 26}
                  textAnchor="end"
                  fill="#64748B"
                  fontSize="8"
                  fontFamily="monospace"
                >
                  {module.code}
                </text>

                <path
                  d={`M${module.x + 16} ${module.y + 40} H${module.x + 204}`}
                  stroke="#64748B"
                  strokeOpacity="0.22"
                />

                {/* Module-specific visualizations */}
                {index === 0 && (
                  <g>
                    <rect
                      x={module.x + 18}
                      y={module.y + 54}
                      width="82"
                      height="72"
                      rx="5"
                      fill="#0B1424"
                      stroke="#60A5FA"
                      strokeOpacity="0.2"
                    />
                    <rect
                      x={module.x + 37}
                      y={module.y + 70}
                      width="43"
                      height="40"
                      rx="3"
                      stroke="#60A5FA"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                    <circle
                      cx={module.x + 58}
                      cy={module.y + 90}
                      r="9"
                      fill="#3B82F6"
                      fillOpacity="0.18"
                      stroke="#93C5FD"
                    />
                    <path
                      d={`M${module.x + 113} ${module.y + 69} H${module.x + 194} M${module.x + 113} ${module.y + 87} H${module.x + 180} M${module.x + 113} ${module.y + 105} H${module.x + 190}`}
                      stroke="#60A5FA"
                      strokeOpacity="0.45"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <text
                      x={module.x + 113}
                      y={module.y + 122}
                      fill="#64748B"
                      fontSize="8"
                      fontFamily="monospace"
                    >
                      IMAGE ANALYSIS
                    </text>
                  </g>
                )}

                {index === 1 && (
                  <g>
                    {[0, 1, 2, 3].map((row) => (
                      <g key={row}>
                        <circle
                          cx={module.x + 29 + row * 18}
                          cy={module.y + 76}
                          r="4"
                          fill="#60A5FA"
                          fillOpacity="0.8"
                        />
                        <circle
                          cx={module.x + 29 + row * 18}
                          cy={module.y + 104}
                          r="4"
                          fill="#818CF8"
                          fillOpacity="0.8"
                        />
                        <path
                          d={`M${module.x + 29 + row * 18} ${module.y + 80} V${module.y + 100}`}
                          stroke="#60A5FA"
                          strokeOpacity="0.5"
                        />
                      </g>
                    ))}
                    <path
                      d={`M${module.x + 29} ${module.y + 76} L${module.x + 83} ${module.y + 104} L${module.x + 83} ${module.y + 76} L${module.x + 101} ${module.y + 104}`}
                      stroke="#93C5FD"
                      strokeOpacity="0.55"
                      strokeWidth="1.2"
                    />
                    <path
                      d={`M${module.x + 119} ${module.y + 68} H${module.x + 195} M${module.x + 119} ${module.y + 86} H${module.x + 185} M${module.x + 119} ${module.y + 104} H${module.x + 194}`}
                      stroke="#818CF8"
                      strokeOpacity="0.5"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <text
                      x={module.x + 119}
                      y={module.y + 122}
                      fill="#64748B"
                      fontSize="8"
                      fontFamily="monospace"
                    >
                      MODEL PIPELINE
                    </text>
                  </g>
                )}

                {index === 2 && (
                  <g>
                    {[0, 1, 2, 3, 4, 5, 6].map((bar) => (
                      <rect
                        key={bar}
                        x={module.x + 21 + bar * 13}
                        y={module.y + 111 - [19, 33, 25, 46, 36, 55, 42][bar]}
                        width="7"
                        height={[19, 33, 25, 46, 36, 55, 42][bar]}
                        rx="2"
                        fill="#60A5FA"
                        fillOpacity={0.45 + bar * 0.04}
                      />
                    ))}
                    <path
                      d={`M${module.x + 121} ${module.y + 67} H${module.x + 194} M${module.x + 121} ${module.y + 85} H${module.x + 182} M${module.x + 121} ${module.y + 103} H${module.x + 190}`}
                      stroke="#60A5FA"
                      strokeOpacity="0.45"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <text
                      x={module.x + 121}
                      y={module.y + 122}
                      fill="#64748B"
                      fontSize="8"
                      fontFamily="monospace"
                    >
                      DATA FLOW
                    </text>
                  </g>
                )}

                {index === 3 && (
                  <g>
                    <circle
                      cx={module.x + 58}
                      cy={module.y + 88}
                      r="28"
                      stroke="#60A5FA"
                      strokeOpacity="0.25"
                    />
                    <circle
                      cx={module.x + 58}
                      cy={module.y + 88}
                      r="18"
                      stroke="#60A5FA"
                      strokeOpacity="0.5"
                    />
                    <circle
                      cx={module.x + 58}
                      cy={module.y + 88}
                      r="5"
                      fill="#93C5FD"
                    />
                    <path
                      d={`M${module.x + 58} ${module.y + 60} V${module.y + 70} M${module.x + 86} ${module.y + 88} H${module.x + 76} M${module.x + 58} ${module.y + 116} V${module.y + 106}`}
                      stroke="#93C5FD"
                    />
                    <path
                      d={`M${module.x + 110} ${module.y + 68} H${module.x + 195} M${module.x + 110} ${module.y + 86} H${module.x + 182} M${module.x + 110} ${module.y + 104} H${module.x + 191}`}
                      stroke="#60A5FA"
                      strokeOpacity="0.45"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <text
                      x={module.x + 110}
                      y={module.y + 122}
                      fill="#64748B"
                      fontSize="8"
                      fontFamily="monospace"
                    >
                      SERVICE LAYER
                    </text>
                  </g>
                )}
              </g>
            ))}

            {/* Central intelligence core */}
            <circle
              cx="450"
              cy="350"
              r="132"
              fill="url(#coreLight)"
              filter="url(#largeGlow)"
            />

            <circle
              cx="450"
              cy="350"
              r="94"
              stroke="#60A5FA"
              strokeOpacity="0.12"
              strokeDasharray="3 8"
            />

            <circle
              cx="450"
              cy="350"
              r="78"
              stroke="#60A5FA"
              strokeOpacity="0.35"
            />

            <circle
              cx="450"
              cy="350"
              r="65"
              stroke="#93C5FD"
              strokeOpacity="0.16"
              strokeDasharray="2 6"
            />

            <circle
              cx="450"
              cy="350"
              r="52"
              fill="#101B31"
              stroke="#60A5FA"
              strokeOpacity="0.65"
            />

            <circle
              cx="450"
              cy="350"
              r="39"
              fill="url(#coreFill)"
              fillOpacity="0.17"
            />

            <circle
              cx="450"
              cy="350"
              r="25"
              fill="#3B82F6"
              fillOpacity="0.2"
              filter="url(#glow)"
            />

            <circle
              cx="450"
              cy="350"
              r="10"
              fill="#DBEAFE"
              filter="url(#glow)"
            />

            {/* Orbital movement */}
            <circle
              cx="450"
              cy="350"
              r="112"
              stroke="#93C5FD"
              strokeWidth="1.4"
              strokeDasharray="30 190 8 190"
              strokeOpacity="0.75"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 450 350"
                to="360 450 350"
                dur="28s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Floating orbital particles */}
            <g fill="#BFDBFE" filter="url(#glow)">
              <circle cx="450" cy="238" r="3">
                <animate
                  attributeName="opacity"
                  values="0.3;1;0.3"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="562" cy="350" r="2.5">
                <animate
                  attributeName="opacity"
                  values="1;0.25;1"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="338" cy="350" r="2.5">
                <animate
                  attributeName="opacity"
                  values="0.2;1;0.2"
                  dur="3.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            {/* Core label */}
            <g
              fill="#CBD5E1"
              textAnchor="middle"
              fontFamily="monospace"
              letterSpacing="2"
            >
              <text x="450" y="446" fontSize="10">
                INTELLIGENCE ENGINE
              </text>
              <text
                x="450"
                y="463"
                fontSize="8"
                fill="#64748B"
                letterSpacing="1.5"
              >
                AI SYSTEMS / CORE 01
              </text>
            </g>

            {/* Subtle technical annotations */}
            <g
              fill="#64748B"
              fontSize="9"
              fontFamily="monospace"
              letterSpacing="1.5"
            >
              <text x="55" y="40">SYSTEM ARCHITECTURE</text>
              <text x="845" y="40" textAnchor="end">FIG. 01 / AI</text>
              <text x="55" y="656">PERCEPTION · LEARNING · AUTOMATION</text>
              <text x="845" y="656" textAnchor="end">ENGINEERING VIEW</text>
            </g>

            {/* Corner framing */}
            <g stroke="#60A5FA" strokeOpacity="0.4" strokeWidth="1.2">
              <path d="M34 60 V30 H64" />
              <path d="M836 30 H866 V60" />
              <path d="M34 620 V650 H64" />
              <path d="M836 650 H866 V620" />
            </g>

            {/* Bottom system indicator */}
            <g>
              <rect
                x="350"
                y="620"
                width="200"
                height="28"
                rx="14"
                fill="#101B31"
                stroke="#60A5FA"
                strokeOpacity="0.3"
              />
              <circle cx="368" cy="634" r="3" fill="#60A5FA">
                <animate
                  attributeName="opacity"
                  values="0.4;1;0.4"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <text
                x="382"
                y="638"
                fill="#93C5FD"
                fontSize="9"
                fontFamily="monospace"
                letterSpacing="1"
              >
                SYSTEMS THINKING
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
