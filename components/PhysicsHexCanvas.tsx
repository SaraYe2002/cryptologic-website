"use client";
import { useEffect, useRef } from "react";

type Props = { className?: string };

export default function PhysicsHexCanvas({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    let animationFrame = 0;
    let destroyed = false;

    function resize() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function hexPoints(cx: number, cy: number, r: number, rot: number) {
      const pts: Array<{ x: number, y: number }> = [];
      for (let i = 0; i < 6; i++) {
        const a = rot + (Math.PI / 3) * i;
        pts.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
      }
      return pts;
    }

    function reflectVelocity(vx: number, vy: number, nx: number, ny: number, restitution: number) {
      const vdotn = vx * nx + vy * ny;
      return [vx - (1 + restitution) * vdotn * nx, vy - (1 + restitution) * vdotn * ny] as const;
    }

    const state = {
      time: 0,
      angle: 0,
      ball: { x: 0, y: 0, vx: 160, vy: -40, r: 12 },
      gravity: 50,
      friction: 0.0005,
      restitution: 0.95,
    };

    const onResize = () => resize();
    resize();
    window.addEventListener("resize", onResize);

    function step(ts: number) {
      if (destroyed) return;
      if (!state.time) state.time = ts;
      const dt = Math.min(0.033, (ts - state.time) / 1000);
      state.time = ts;

      const { width, height } = canvas;
      const vw = width / (window.devicePixelRatio || 1);
      const vh = height / (window.devicePixelRatio || 1);

      state.angle += dt * 0.3;

      const cx = vw / 2, cy = vh / 2;
      const hexRadius = Math.min(vw, vh) * 0.35;
      const pts = hexPoints(cx, cy, hexRadius, state.angle);

      state.ball.vy += state.gravity * dt;
      state.ball.vx *= (1 - state.friction);
      state.ball.vy *= (1 - state.friction);
      state.ball.x += state.ball.vx * dt;
      state.ball.y += state.ball.vy * dt;

      if (state.ball.x === 0 && state.ball.y === 0) {
        state.ball.x = cx + hexRadius * 0.2;
        state.ball.y = cy - hexRadius * 0.1;
      }

      for (let i = 0; i < 6; i++) {
        const a = pts[i];
        const b = pts[(i + 1) % 6];
        const edgeX = b.x - a.x;
        const edgeY = b.y - a.y;
        const len = Math.hypot(edgeX, edgeY) || 1;
        // inward normal (rotate edge by -90 deg for CCW hexagon)
        const nx = (-edgeY / len);
        const ny = (edgeX / len);
        const dist = ((state.ball.x - a.x) * nx + (state.ball.y - a.y) * ny);
        const overlap = state.ball.r - dist;
        if (overlap > 0) {
          state.ball.x += nx * overlap;
          state.ball.y += ny * overlap;
          const v = reflectVelocity(state.ball.vx, state.ball.vy, nx, ny, state.restitution);
          state.ball.vx = v[0];
          state.ball.vy = v[1];
        }
      }

      ctx.clearRect(0, 0, vw, vh);

      const grd = ctx.createRadialGradient(cx, cy, hexRadius * 0.2, cx, cy, hexRadius * 1.2);
      grd.addColorStop(0, "rgba(91,214,229,0.10)");
      grd.addColorStop(1, "rgba(138,92,255,0.06)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, vw, vh);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < 6; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.closePath();
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.clip();
      ctx.translate(cx, cy);
      ctx.rotate(state.angle * 1.2);
      ctx.translate(-cx, -cy);
      ctx.strokeStyle = "rgba(91,214,229,0.10)";
      ctx.lineWidth = 1;
      for (let r = 10; r < hexRadius; r += 14) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      const { x, y, r } = state.ball;
      const lg = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
      lg.addColorStop(0, "rgba(91,214,229,0.9)");
      lg.addColorStop(1, "rgba(138,92,255,0.0)");
      ctx.fillStyle = lg;
      ctx.beginPath();
      ctx.arc(x, y, r * 2.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#0c2030";
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animationFrame = requestAnimationFrame(step);
    }

    animationFrame = requestAnimationFrame(step);
    return () => { destroyed = true; cancelAnimationFrame(animationFrame); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
