local function toggleNuiFrame(shouldShow,data)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)
  SendReactMessage('setSpawns', data)
end

RegisterNetEvent('ds-spawn:initialize', function(data)
  local spawns = Config.Locations

  if Config.LastLocation then

    if data then
      table.insert(spawns, {x=data.x,y=data.y,z=data.z,label='Last Location',type='last'}) -- Do not change type!
    end

  end

  toggleNuiFrame(true, spawns)
end)

RegisterNUICallback('selectSpawn', function(data, cb)
  toggleNuiFrame(false)
  cb({})

  local ped = PlayerPedId()

  NetworkEndTutorialSession()
  RequestCollisionAtCoord(data.x,data.y,data.z)
  SetEntityCoordsNoOffset(PlayerPedId(), data.x,data.y,data.z, false, false, false)
  FreezeEntityPosition(ped, true)
  SetGameplayCamRelativeHeading(0)

  while GetPlayerSwitchState() ~= 5 do Wait(0) end

  SwitchInPlayer(ped)

  while GetPlayerSwitchState() ~= 12 do Wait(0) end

  while not HasCollisionLoadedAroundEntity(ped) do Wait(0) end
  FreezeEntityPosition(ped, false)

  TriggerEvent('playerSpawned')
end)