# Configuración de Avatares de Discord

Para que los avatares de Discord se muestren correctamente en la página de Staff, necesitas configurar un bot token de Discord.

## Pasos para configurar:

1. Ve a https://discord.com/developers/applications
2. Crea una nueva aplicación o selecciona una existente
3. Ve a la sección "Bot" y crea un bot
4. Copia el token del bot
5. Agrega el token a tu archivo `.env.local`:

```
DISCORD_BOT_TOKEN=tu_token_aqui
```

## Nota:

Si no configuras el token, la página seguirá funcionando pero mostrará avatares por defecto de Discord basados en el ID del usuario.

Los avatares se actualizan cada hora (cache de 3600 segundos) para mejorar el rendimiento.

