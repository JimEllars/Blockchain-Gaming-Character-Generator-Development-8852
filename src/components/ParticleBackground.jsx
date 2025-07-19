import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Pastel color particles for the cute theme
    const particles = [];
    const particleCount = 80;
    
    // Pastel colors
    const colors = [
      '#E6E6FA', // Lavender
      '#98FB98', // Mint Green
      '#FFBCD9', // Cotton Candy
      '#FFCCF9', // Pink
      '#B5EAD7', // Mint
      '#FFB7B2', // Peach
      '#FFC8DD', // Pastel Pink
      '#DCD3FF', // Light Purple
      '#C7CEEA', // Periwinkle
      '#F1FFC4', // Light Yellow
    ];

    // Cloud shapes
    const clouds = [];
    const cloudCount = 12;
    
    for (let i = 0; i < cloudCount; i++) {
      clouds.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 2),
        width: Math.random() * 100 + 50,
        height: Math.random() * 50 + 30,
        speed: Math.random() * 0.2 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.1
      });
    }
    
    // Stars and sparkles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.1 + 0.05,
        opacity: Math.random() * 0.7 + 0.3,
        pulse: Math.random() * 0.02 + 0.01,
        maxSize: Math.random() * 3 + 2,
        minSize: Math.random() * 1 + 0.5,
        growing: true
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw clouds
      clouds.forEach(cloud => {
        ctx.beginPath();
        ctx.globalAlpha = cloud.opacity;
        ctx.fillStyle = cloud.color;
        
        // Draw cloud shape (multiple circles)
        const centerX = cloud.x;
        const centerY = cloud.y;
        const radiusX = cloud.width / 2;
        const radiusY = cloud.height / 2;
        
        // Draw main cloud body
        ctx.arc(centerX, centerY, radiusY, 0, Math.PI * 2);
        ctx.arc(centerX - radiusX * 0.5, centerY, radiusY * 0.7, 0, Math.PI * 2);
        ctx.arc(centerX + radiusX * 0.5, centerY, radiusY * 0.7, 0, Math.PI * 2);
        ctx.arc(centerX - radiusX * 0.2, centerY - radiusY * 0.5, radiusY * 0.7, 0, Math.PI * 2);
        ctx.arc(centerX + radiusX * 0.2, centerY - radiusY * 0.5, radiusY * 0.7, 0, Math.PI * 2);
        
        ctx.fill();
        
        // Move cloud
        cloud.x += cloud.speed;
        if (cloud.x > canvas.width + cloud.width) {
          cloud.x = -cloud.width;
          cloud.y = Math.random() * (canvas.height / 2);
        }
      });
      
      // Draw sparkles and stars
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        
        // Pulsing effect
        if (particle.growing) {
          particle.size += particle.pulse;
          if (particle.size >= particle.maxSize) {
            particle.growing = false;
          }
        } else {
          particle.size -= particle.pulse;
          if (particle.size <= particle.minSize) {
            particle.growing = true;
          }
        }
        
        // Star shape for some particles
        if (particle.size > 2) {
          const spikes = 5;
          const outerRadius = particle.size;
          const innerRadius = particle.size / 2;
          let rot = Math.PI / 2 * 3;
          let x = particle.x;
          let y = particle.y;
          let step = Math.PI / spikes;
          
          ctx.beginPath();
          for (let i = 0; i < spikes; i++) {
            x = particle.x + Math.cos(rot) * outerRadius;
            y = particle.y + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;
            
            x = particle.x + Math.cos(rot) * innerRadius;
            y = particle.y + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
          }
          ctx.lineTo(particle.x + Math.cos(Math.PI / 2 * 3) * outerRadius, particle.y + Math.sin(Math.PI / 2 * 3) * outerRadius);
          ctx.closePath();
          ctx.fill();
        } else {
          // Circle for smaller particles
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Float up slowly
        particle.y -= particle.speed;
        if (particle.y < -10) {
          particle.y = canvas.height + 10;
          particle.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
};

export default ParticleBackground;