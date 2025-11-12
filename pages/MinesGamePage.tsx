
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Icons } from '../components/icons';
import { useToast } from '../context/ToastContext';
import { ProvablyFairModal } from '../components/ProvablyFairModal';
import { useSound } from '../context/SoundContext';

type TileState = 'hidden' | 'safe' | 'mine' | 'exploded';
type GameState = 'idle' | 'playing' | 'cashed_out' | 'busted';

interface Tile {
    id: number;
    isMine: boolean;
    state: TileState;
}

// ASSET URLS - UPDATED V5.7
const ASSETS = {
    GEM: "https://files.catbox.moe/nz8fbf.png", // High-Fidelity Diamond
    MINE: "https://files.catbox.moe/1ua893.png"  // High-Fidelity Bomb
};

export const MinesGamePage = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { playSound } = useSound();

    // Simulation Config
    const [startBalance, setStartBalance] = useState<number>(10000);
    const [simBalance, setSimBalance] = useState<number>(10000);

    // Game Config
    const [mineCount, setMineCount] = useState<number>(3);
    const [betAmount, setBetAmount] = useState<number>(100);

    // Game State
    const [gameState, setGameState] = useState<GameState>('idle');
    const [grid, setGrid] = useState<Tile[]>([]);
    const [revealedCount, setRevealedCount] = useState<number>(0);
    const [isHoveringTile, setIsHoveringTile] = useState<number | null>(null);

    // PROVABLY FAIR STATE
    const [pfModalOpen, setPfModalOpen] = useState(false);
    const [serverSeedHash, setServerSeedHash] = useState('e4b5c6d7e8...'); // Mock initial
    const [clientSeed, setClientSeed] = useState('zap_mines_v1');
    const [nonce, setNonce] = useState(0);

    // Init
    useEffect(() => {
        resetGrid();
        setSimBalance(startBalance);
    }, [startBalance]);

    const resetGrid = () => {
        setGrid(Array.from({ length: 25 }, (_, i) => ({ id: i, isMine: false, state: 'hidden' })));
    };

    const handleSessionReset = () => {
        setSimBalance(startBalance);
        setGameState('idle');
        resetGrid();
        setRevealedCount(0);
        showToast("SIMULATION SESSION RESET.", "info");
    };

    const startGame = () => {
        if (betAmount <= 0) {
             showToast("INVALID BET AMOUNT.", "error");
             return;
        }
        if (betAmount > simBalance) {
            showToast("INSUFFICIENT FUNDS FOR DEPLOYMENT.", "error");
            return;
        }
        playSound('game_start');
        setSimBalance(prev => prev - betAmount);
        setGameState('playing');
        setRevealedCount(0);
        setNonce(prev => prev + 1); // Increment PF nonce on new game

        const newGrid: Tile[] = Array.from({ length: 25 }, (_, i) => ({ id: i, isMine: false, state: 'hidden' }));
        let minesPlaced = 0;
        while (minesPlaced < mineCount) {
            const idx = Math.floor(Math.random() * 25);
            if (!newGrid[idx].isMine) {
                newGrid[idx].isMine = true;
                minesPlaced++;
            }
        }
        setGrid(newGrid);
    };

    const handleTileClick = (index: number) => {
        if (gameState !== 'playing' || grid[index].state !== 'hidden') return;

        const newGrid = [...grid];
        const tile = newGrid[index];

        if (tile.isMine) {
            tile.state = 'exploded';
            setGameState('busted');
            revealAll(newGrid);
            playSound('mine_boom');
        } else {
            tile.state = 'safe';
            setRevealedCount(prev => prev + 1);
            playSound('mine_safe', 0.5 + (revealedCount * 0.02));
            if (revealedCount + 1 === 25 - mineCount) {
                cashout(newGrid);
            }
        }
        setGrid(newGrid);
    };

    const cashout = (currentGrid = grid) => {
        if (gameState !== 'playing') return;
        const winAmount = betAmount * currentMultiplier;
        setSimBalance(prev => prev + winAmount);
        setGameState('cashed_out');
        revealAll(currentGrid, false);
        playSound('cashout');
    };

    const revealAll = (currentGrid: Tile[], exploded = true) => {
        setGrid(currentGrid.map(tile => {
            if (tile.state === 'hidden') {
                return { ...tile, state: tile.isMine ? 'mine' : 'hidden' };
            }
            return tile;
        }));
    };

    // Standard combinatorial mines multiplier ensuring 99% RTP (1% house edge for realism)
    const calculateMultiplier = (mines: number, revealed: number) => {
        if (revealed === 0) return 1.00;
        let multiplier = 1.0;
        const houseEdge = 0.99; // 1% edge standard for originals
        for (let i = 0; i < revealed; i++) {
            multiplier *= (25 - i) / (25 - mines - i);
        }
        return multiplier * houseEdge;
    };

    const currentMultiplier = useMemo(() => calculateMultiplier(mineCount, revealedCount), [mineCount, revealedCount]);
    const nextMultiplier = useMemo(() => calculateMultiplier(mineCount, revealedCount + 1), [mineCount, revealedCount]);
    const currentProfit = (betAmount * currentMultiplier) - betAmount;
    const nextProfit = (betAmount * nextMultiplier) - betAmount;

    const handleRotateSeeds = (newClientSeed: string) => {
        setClientSeed(newClientSeed);
        setServerSeedHash(Math.random().toString(36).substring(2) + '...'); // Mock new hash
        setNonce(0);
        showToast("SEEDS ROTATED. LEDGER RESET.", "success");
    };

    return (
        <div className="container mx-auto max-w-7xl p-4 py-6 md:p-8 page-fade-in min-h-[calc(100vh-8rem)] flex flex-col">
            
            {/* HEADER NAV & BALANCE */}
             <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                     <Button variant="ghost" onClick={() => navigate('/strategy-sandbox')} className="text-[#8d8c9e] hover:text-white px-0 md:px-4">
                        <Icons.ChevronLeft className="h-5 w-5 mr-2" /> SANDBOX HUB
                    </Button>
                    <div className="h-8 w-px bg-[#333] hidden md:block"></div>
                    <div>
                        <h1 className="font-orbitron text-xl md:text-2xl text-white uppercase tracking-wider flex items-center gap-3">
                            <Icons.Bomb className="h-6 w-6 text-[#00FFC0]" />
                            MINES PROTOCOL
                        </h1>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                     <Button 
                        variant="ghost" 
                        onClick={() => setPfModalOpen(true)}
                        className="text-[#00FFC0] border border-[#00FFC0]/30 hover:bg-[#00FFC0]/10 font-mono uppercase text-xs hidden md:flex"
                     >
                        <Icons.Lock className="h-4 w-4 mr-2" /> PROVABLY FAIR
                     </Button>
                     {/* Sim Balance Config */}
                     {gameState === 'idle' && (
                        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#8d8c9e] mr-4">
                            <span>START AMT:</span>
                             <input 
                                type="number" 
                                value={startBalance}
                                onChange={(e) => {
                                    const val = Number(e.target.value);
                                    setStartBalance(val);
                                    setSimBalance(val);
                                }}
                                className="bg-[#0A0A0A] border border-[#333] rounded px-2 py-1 w-24 text-white focus:border-[#00FFC0] outline-none text-right font-mono"
                            />
                        </div>
                     )}
                    <div className="bg-[#0c0c0e] px-5 py-3 rounded-xl border border-[#333] flex items-center justify-between md:justify-start gap-6 font-mono shadow-xl w-full md:w-auto">
                        <span className="text-[#8d8c9e] text-xs uppercase tracking-wider flex items-center gap-2">
                            <Icons.Wallet className="h-4 w-4" /> SIM BALANCE
                        </span>
                        <span className={`text-xl tracking-tight font-bold ${simBalance < startBalance ? 'text-red-500' : simBalance > startBalance ? 'text-[#00FFC0]' : 'text-white'}`}>
                            ${simBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 flex-1">
                
                {/* LEFT CONSOLE (3/12) - ORDER LAST ON MOBILE */}
                <Card className="lg:col-span-3 order-last lg:order-first bg-[#0c0c0e] border-[#333] p-0 flex flex-col h-fit lg:sticky lg:top-24 overflow-hidden">
                    
                    {/* Console Header */}
                    <div className="p-4 bg-[#14131c] border-b border-[#333] flex justify-between items-center">
                        <span className="font-heading text-xs text-white uppercase tracking-widest flex items-center gap-2">
                            <Icons.Sliders className="h-4 w-4 text-[#00FFC0]" /> CONFIGURATION
                        </span>
                        <div className="flex gap-2">
                            {/* Mobile PF Button */}
                            <button onClick={() => setPfModalOpen(true)} className="md:hidden text-[#00FFC0] p-1">
                                <Icons.Lock className="h-4 w-4" />
                            </button>
                            <button onClick={handleSessionReset} disabled={gameState === 'playing'} className="text-[#8d8c9e] hover:text-white disabled:opacity-50 p-1" title="Reset Session">
                                <Icons.Repeat className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <div className="p-5 space-y-6">
                        
                        {/* Bet Amount */}
                        <div>
                            <label className="flex justify-between text-[10px] font-mono text-[#8d8c9e] uppercase mb-2">
                                <span>Bet Amount (USD)</span>
                            </label>
                            <div className="relative flex items-center">
                                <span className="absolute left-4 text-[#8d8c9e]">$</span>
                                <Input 
                                    type="number" 
                                    value={betAmount} 
                                    onChange={(e) => setBetAmount(Number(e.target.value))}
                                    disabled={gameState === 'playing'}
                                    className={`font-mono text-lg pl-8 pr-4 bg-[#0A0A0A] border-[#333] h-12 focus:border-[#00FFC0] transition-all ${gameState === 'playing' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                />
                            </div>
                             <div className="grid grid-cols-4 gap-2 mt-2">
                                {['MIN', '1/2', '2x', 'MAX'].map(opt => (
                                    <button 
                                        key={opt}
                                        disabled={gameState === 'playing'}
                                        onClick={() => {
                                            if (opt === 'MIN') setBetAmount(1);
                                            if (opt === '1/2') setBetAmount(Math.max(1, betAmount / 2));
                                            if (opt === '2x') setBetAmount(betAmount * 2);
                                            if (opt === 'MAX') setBetAmount(simBalance);
                                        }}
                                        className="bg-[#14131c] border border-[#333] rounded text-[10px] font-heading py-2 text-[#8d8c9e] hover:text-white hover:border-[#8d8c9e] transition-all disabled:opacity-30 active:scale-95"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mine Density */}
                         <div>
                            <div className="flex justify-between text-[10px] font-mono text-[#8d8c9e] uppercase mb-3">
                                <span>Mine Density</span>
                                <span className={`px-2 py-0.5 rounded font-bold ${mineCount >= 15 ? 'bg-red-950 text-red-500' : mineCount >= 8 ? 'bg-yellow-950 text-yellow-500' : 'bg-[#333] text-white'}`}>
                                    {mineCount}
                                </span>
                            </div>
                            <div className="px-2">
                                <input 
                                    type="range" 
                                    min="1" max="24" 
                                    value={mineCount}
                                    onChange={(e) => setMineCount(Number(e.target.value))}
                                    disabled={gameState === 'playing'}
                                    className={`w-full accent-[#00FFC0] h-1.5 bg-[#333] rounded-lg appearance-none cursor-pointer ${gameState === 'playing' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                />
                            </div>
                            <div className="flex justify-between text-[10px] text-[#666] font-mono mt-3 uppercase px-1">
                                <span>1</span>
                                <span>5</span>
                                <span>10</span>
                                <span>15</span>
                                <span>20</span>
                                <span>24</span>
                            </div>
                        </div>

                    </div>

                    {/* Main Action Switch */}
                    <div className="p-5 pt-0 mt-auto">
                        {gameState === 'playing' ? (
                             <Button 
                                onClick={() => cashout()} 
                                size="lg"
                                className={`w-full py-6 font-orbitron font-bold uppercase tracking-widest text-lg shadow-[0_0_30px_rgba(0,255,192,0.3)] ${revealedCount === 0 ? 'opacity-50 cursor-not-allowed bg-[#14131c] border-[#333] text-[#8d8c9e] shadow-none' : 'animate-pulse-glow bg-[#00FFC0] text-black hover:scale-[1.02] border-[#00FFC0]'}`}
                                disabled={revealedCount === 0}
                            >
                                <div className="flex flex-col items-center leading-none">
                                    <span>CASHOUT</span>
                                    <span className="text-xs font-mono mt-1 opacity-80">${(betAmount * currentMultiplier).toFixed(2)}</span>
                                </div>
                            </Button>
                        ) : (
                            <Button onClick={startGame} size="lg" className="w-full py-6 font-orbitron font-bold uppercase tracking-widest text-lg shadow-[0_0_30px_rgba(0,255,192,0.15)] bg-[#00FFC0] text-black hover:scale-[1.02] active:scale-95 transition-all">
                                DEPLOY PROBE
                            </Button>
                        )}
                    </div>
                </Card>

                {/* CENTER: THE RIG (9/12) */}
                <div className="lg:col-span-9 flex flex-col">
                    
                    {/* LIVE TELEMETRY HUD */}
                    <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                         {/* Current Multiplier */}
                        <div className="bg-[#0c0c0e] p-4 rounded-xl border border-[#333] flex flex-col justify-between min-h-[100px]">
                            <span className="text-[#8d8c9e] text-[10px] font-mono uppercase mb-1 flex items-center gap-2">
                                <Icons.Activity className="h-3 w-3" /> CURRENT MULTIPLIER
                            </span>
                            <span className={`font-mono text-3xl font-bold ${gameState === 'playing' && revealedCount > 0 ? 'text-[#00FFC0]' : 'text-white'}`}>
                                {currentMultiplier.toFixed(2)}x
                            </span>
                        </div>

                        {/* Next Tile Intel */}
                        <div className={`p-4 rounded-xl border flex flex-col justify-between min-h-[100px] transition-all duration-300 relative overflow-hidden
                            ${gameState === 'playing' ? 'bg-[#00FFC0]/10 border-[#00FFC0] shadow-[0_0_20px_rgba(0,255,192,0.15)]' : 'bg-[#0c0c0e] border-[#333] opacity-60'}`}>
                             {gameState === 'playing' && <div className="absolute inset-0 bg-[#00FFC0]/5 animate-pulse-slow pointer-events-none"></div>}
                             <span className={`text-[10px] font-mono uppercase mb-1 flex items-center gap-2 relative z-10 ${gameState === 'playing' ? 'text-[#00FFC0]' : 'text-[#8d8c9e]'}`}>
                                <Icons.Crosshair className="h-3 w-3" /> NEXT TILE VALUE
                            </span>
                            <div>
                                <span className="font-mono text-3xl font-bold text-white relative z-10 block leading-none">
                                    {nextMultiplier.toFixed(2)}x
                                </span>
                                <span className={`text-xs font-mono uppercase relative z-10 mt-1 block ${gameState === 'playing' ? 'text-[#00FFC0]' : 'text-[#666]'}`}>
                                    +${nextProfit.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {/* Profit Tracker */}
                         <div className="bg-[#0c0c0e] p-4 rounded-xl border border-[#333] flex flex-col justify-between min-h-[100px]">
                             <span className="text-[#8d8c9e] text-[10px] font-mono uppercase mb-1 flex items-center gap-2">
                                <Icons.TrendingUp className="h-3 w-3" /> CURRENT PROFIT
                            </span>
                            <span className={`font-mono text-2xl font-bold ${currentProfit > 0 ? 'text-[#00FFC0]' : 'text-[#8d8c9e]'}`}>
                                ${currentProfit.toFixed(2)}
                            </span>
                        </div>

                         {/* Safe Remaining */}
                         <div className="bg-[#0c0c0e] p-4 rounded-xl border border-[#333] flex flex-col justify-between min-h-[100px]">
                             <span className="text-[#8d8c9e] text-[10px] font-mono uppercase mb-1 flex items-center gap-2">
                                <Icons.Shield className="h-3 w-3" /> SAFE TILES LEFT
                            </span>
                            <span className="font-mono text-3xl font-bold text-white">
                                {25 - mineCount - revealedCount}
                                <span className="text-base text-[#666] ml-2">/ {25 - mineCount}</span>
                            </span>
                        </div>
                    </div>

                    {/* THE BOARD (Fixed Aspect Ratio Container) */}
                    <div className="flex-1 min-h-0 relative flex items-center justify-center">
                         {/* Outer Bezel - 3D Effect */}
                         <div className="w-full max-w-[650px] aspect-square bg-gradient-to-b from-[#2a2a30] to-[#0c0c0e] p-3 md:p-5 rounded-[36px] relative shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] ring-1 ring-white/5">
                             
                             {/* Top Highlight Bezel */}
                             <div className="absolute inset-0 rounded-[36px] ring-1 ring-inset ring-white/10 pointer-events-none"></div>

                            {/* Inner Tactical Field - Carved Effect */}
                            <div className="w-full h-full bg-[#050507] rounded-[28px] relative overflow-hidden p-3 md:p-4 shadow-[inset_0_8px_25px_rgba(0,0,0,0.8)]">
                                {/* Background Grid Texture */}
                                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(0,255,192,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

                                {/* THE GRID ITSELF */}
                                <div className="grid grid-cols-5 gap-2 md:gap-3 h-full w-full relative z-10">
                                    {grid.map((tile, index) => {
                                        const isInteractable = gameState === 'playing' && tile.state === 'hidden';
                                        // Kinetic 3D classes
                                        const tileBase = "absolute inset-0 w-full h-full rounded-xl flex items-center justify-center transition-all duration-100 ease-out font-bold text-2xl";
                                        
                                        // 3D Raised Button State
                                        const hiddenState = "bg-gradient-to-b from-[#2a2a35] to-[#1a1a20] shadow-[0_5px_0_#0a0a0c] hover:-translate-y-[1px] hover:brightness-110 active:translate-y-[3px] active:shadow-[0_2px_0_#0a0a0c] border-t border-white/10";
                                        
                                        // 3D Pressed/Recessed States
                                        const safeState = "bg-[#0a0a0c] shadow-[inset_0_3px_8px_rgba(0,0,0,0.8)] translate-y-[5px] border border-[#00FFC0]/20";
                                        const mineState = "bg-[#0a0a0c] shadow-[inset_0_3px_8px_rgba(0,0,0,0.8)] translate-y-[5px] opacity-60";
                                        const explodedState = "bg-red-950/30 shadow-[inset_0_3px_8px_rgba(0,0,0,0.8),0_0_30px_rgba(239,68,68,0.4)] translate-y-[5px] border border-red-500/50";

                                        return (
                                            <div key={tile.id} className="relative w-full h-full perspective-500">
                                                <button
                                                    onClick={() => handleTileClick(index)}
                                                    onMouseEnter={() => setIsHoveringTile(index)}
                                                    onMouseLeave={() => setIsHoveringTile(null)}
                                                    disabled={!isInteractable}
                                                    className={`${tileBase}
                                                        ${tile.state === 'hidden' ? hiddenState : ''}
                                                        ${tile.state === 'safe' ? safeState : ''}
                                                        ${tile.state === 'exploded' ? explodedState : ''}
                                                        ${tile.state === 'mine' ? mineState : ''}
                                                    `}
                                                >
                                                    {/* Hover Reticle (Zero Layout Impact) */}
                                                    {isInteractable && isHoveringTile === index && (
                                                        <div className="absolute inset-1 border-2 border-[#00FFC0]/50 rounded-[10px] pointer-events-none animate-pulse-fast">
                                                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00FFC0]"></div>
                                                            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00FFC0]"></div>
                                                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00FFC0]"></div>
                                                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00FFC0]"></div>
                                                        </div>
                                                    )}

                                                    {/* ICONS - KINETIC IMAGE REVEALS */}
                                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-xl">
                                                        {tile.state === 'safe' && (
                                                            <img 
                                                                src={ASSETS.GEM} 
                                                                alt="Safe" 
                                                                className="w-[75%] h-[75%] object-contain drop-shadow-[0_0_15px_rgba(0,255,192,0.5)] animate-[bounce_0.4s_ease-out]" 
                                                            />
                                                        )}
                                                        {tile.state === 'exploded' && (
                                                            <img 
                                                                src={ASSETS.MINE} 
                                                                alt="EXPLODED" 
                                                                className="w-[80%] h-[80%] object-contain drop-shadow-[0_0_35px_rgba(239,68,68,0.9)] animate-pulse-fast" 
                                                            />
                                                        )}
                                                        {tile.state === 'mine' && (
                                                            <img 
                                                                src={ASSETS.MINE} 
                                                                alt="Mine" 
                                                                className="w-[65%] h-[65%] object-contain opacity-50 grayscale" 
                                                            />
                                                        )}
                                                    </div>
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* GAME OVER OVERLAY */}
                                {(gameState === 'busted' || gameState === 'cashed_out') && (
                                    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-[4px] animate-fadeIn rounded-[28px]">
                                        <div className={`p-8 md:p-10 rounded-3xl border-2 text-center transform scale-105 shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col items-center ${gameState === 'busted' ? 'bg-[#0c0c0e] border-red-900/50' : 'bg-[#0c0c0e] border-[#00FFC0]/30'}`}>
                                            
                                            <div className={`mb-4 p-4 rounded-full border-2 ${gameState === 'busted' ? 'bg-red-500/10 border-red-500/20' : 'bg-[#00FFC0]/10 border-[#00FFC0]/20'}`}>
                                                {gameState === 'busted' ? (
                                                    <Icons.Bomb className="h-12 w-12 text-red-500" />
                                                ) : (
                                                    <Icons.Shield className="h-12 w-12 text-[#00FFC0]" />
                                                )}
                                            </div>

                                            <h2 className={`font-orbitron text-4xl md:text-5xl uppercase font-black mb-2 ${gameState === 'busted' ? 'text-white' : 'text-white'}`}>
                                                {gameState === 'busted' ? 'BREACHED' : 'SECURED'}
                                            </h2>
                                            
                                            <div className={`font-mono text-2xl md:text-3xl mb-8 font-bold ${gameState === 'busted' ? 'text-red-500' : 'text-[#00FFC0]'}`}>
                                                {gameState === 'busted' ? `-$${betAmount.toFixed(2)}` : `+$${((betAmount * currentMultiplier) - betAmount).toFixed(2)}`}
                                            </div>

                                            <Button onClick={startGame} size="lg" className={`px-12 py-6 font-orbitron font-black uppercase tracking-widest text-base ${gameState === 'busted' ? 'bg-[#333] hover:bg-white hover:text-black text-white shadow-none' : 'shadow-[0_0_30px_rgba(0,255,192,0.4)]'}`}>
                                                REDEPLOY
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <ProvablyFairModal 
                isOpen={pfModalOpen}
                onClose={() => setPfModalOpen(false)}
                gameName="MINES"
                serverSeedHash={serverSeedHash}
                clientSeed={clientSeed}
                nonce={nonce}
                onRotateSeeds={handleRotateSeeds}
            />
        </div>
    );
};
