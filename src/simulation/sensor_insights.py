import pynmea2
import pandas as pd
import numpy as np
import math
from datetime import datetime
import time
from datetime import timedelta

def getSpeedTests():
	fileSensorInsights = 'sensor_insights_output.csv'
	countCheck = 0
	countParse = 0
	#Declaracion variables
	tim = []
	lat = []
	lon = []
	alt = []
	delta_latitud=[]
	delta_longitud=[]
	delta_altitud=[]
	var_tiempo=[]
	a_append=[]
	c_append=[]
	distance=[]
	radius=6371#[km]
	zer=np.zeros((1, 1))
	velocidad_m_s_append=[]
	velocidad_km_h_append=[]
	tipo_velocidad_append=[]
	distancia_caminar=0
	distancia_trotar=0
	distancia_correr=0
	distancia_sprints=0
	latitude1=[]
	latitude2=[]
	longitude1=[]
	longitude2=[]
	zona_baja_acel=0
	zona_moderada_acel=0
	zona_alta_acel=0
	zona_baja_desacel=0
	zona_moderada_desacel=0
	zona_alta_desacel=0
	tiempo_total=0
	zona_acel2_distancia=0
	num_sprints=0
	#Se abre archivo
	pd.options.mode.chained_assignment = None  # default='warn'
	with open("NMEA.TXT") as f:
		for line in f:
			content = line.split(',')
			if (content[0] == '$GPGGA' and content[2] != '' ):
				try:
					msg = pynmea2.parse(line)
					if msg.altitude >=2000:
						tim.append(str(msg.timestamp))
						lat.append(math.radians(msg.latitude))
						lon.append(math.radians(msg.longitude))
						alt.append(msg.altitude)
				except pynmea2.nmea.ChecksumError:
					countCheck = countCheck + 1
					pass
				except pynmea2.nmea.ParseError:
					countParse = countParse + 1
					pass
	tiempoGrafico=np.delete(tim, (0), axis=0)
	data = { #almacena todos los datos en una matriz
		'Time':tim,
		'Latitude':lat,
		'Longitude':lon,
		'Altitude':alt
	}
	matrix = pd.DataFrame(data)
	#print matrix

	#print("Numero de errores ChecksumError: " + str(countCheck))
	#print("Numero de errores ParseError: " + str(countParse))

	#Calculo de la variacion de Latitud
	for i,line in enumerate(matrix["Latitude"]):
	    if i==0:
	        pass
	    else:
	        deltaLat = math.fabs(matrix["Latitude"][i] - matrix["Latitude"][i-1])
	        delta_latitud.append(deltaLat)
	        lat2=math.degrees(matrix["Latitude"][i])
	        latitude2.append(lat2)
	        lat1=math.degrees(matrix["Latitude"][i-1])
	        latitude1.append(lat1)

	F_delta_latitud=np.insert(delta_latitud, 0, zer, 0)
	#Calculo de la variacion de Longitud
	for i,line in enumerate(matrix["Longitude"]):
	    if i==0:
	        pass
	    else:
	        deltaLon = math.fabs(matrix["Longitude"][i] - matrix["Longitude"][i-1])
	        delta_longitud.append(deltaLon)
	        lon2=math.degrees(matrix["Longitude"][i])
	        longitude2.append(lon2)
	        lon1=math.degrees(matrix["Longitude"][i-1])
	        longitude1.append(lon1)
	F_delta_longitud=np.insert(delta_longitud, 0, zer, 0)

	#Calculo de la variacion de la altitud
	for i,line in enumerate(matrix["Altitude"]):
	    if i==0:
	        pass
	    else:
	        deltaAlt = round(math.fabs((matrix["Altitude"][i]) - (matrix["Altitude"][i-1])),3)
	        delta_altitud.append(deltaAlt) # en metros

	#Transformar tiempo de string a formato tiempo
	for i,line in enumerate(matrix["Time"]):
	   time_format = '%H:%M:%S.%f' if '.' in matrix["Time"][i]  else "%H:%M:%S"

	   matrix["Time"][i] = datetime.strptime(matrix["Time"][i], time_format)

	#Calculo de la variacion de Tiempo
	for i,line in enumerate(matrix["Time"]):
	   if i==0:
	        pass
	   else:
	        delta_time=matrix["Time"][i]-matrix["Time"][i-1]
	        var_tiempo.append(delta_time)
	F_delta_tiempo=np.insert(var_tiempo, 0, zer, 0)

	delta_data = {
	    'Latitude':lat,
	    'Longitud':lon,
	    'DLatitude':F_delta_latitud,
	    'DLongitude':F_delta_longitud,
	    'T':F_delta_tiempo
		#'Latitude1':latitude1
	}

	matrix_delta = pd.DataFrame(delta_data)
	#print matrix_delta
	l=len(matrix_delta)

	#Utilizar formula Haversine parte 1
	for index in range(l):
	    if index == 0:
	        pass
	    else:
	        a = math.sin((matrix_delta["DLatitude"][index])/2)**2 + math.cos((matrix_delta["Latitude"][index-1])) \
	        * math.cos((matrix_delta["Latitude"][index])) * math.sin((matrix_delta["DLongitude"][index])/2)**2
	        a_append.append(a)

	        #print a
	        s=len(a_append)
	        #print s
	F_a={
	    'A':a_append
	}
	#print F_a
	#Utilizar formula Haversine parte 2
	for index in range(s):
	    c = 2 * math.atan2(math.sqrt(F_a["A"][index]), math.sqrt(1-(F_a["A"][index])))
	    #print c
	    c_append.append(c)
	    t=len(c_append)

	F_c={
	    'C':c_append
	}
	#print F_c

	#Calculo Distancia
	for index in range(t):
	    d = round(F_c["C"][index]*radius*1000,3)
	    #print d
	    distance.append(d)

	F_distancia={
	    'Distancia':distance,
	    'Tiempo_Final':var_tiempo,
	    'Tiempo_Segundos': np.zeros(len(var_tiempo))
	}
	matrix_distancia_tiempo = pd.DataFrame(F_distancia)

	pd.options.mode.chained_assignment = None  # default='warn'
	#print matrix_distancia_tiempo

	for i,line in enumerate(matrix_distancia_tiempo["Tiempo_Final"]):
	    delta_segundos = matrix_distancia_tiempo["Tiempo_Final"][i].total_seconds()
	    matrix_distancia_tiempo["Tiempo_Segundos"][i] = delta_segundos

	l_matrix_distancia_tiempo=len(matrix_distancia_tiempo)

	for i,line in enumerate(matrix_distancia_tiempo["Tiempo_Segundos"]):
		tiempo_total=(tiempo_total+matrix_distancia_tiempo["Tiempo_Segundos"][i])
#transformar a minutos
	tiempo_total=tiempo_total/60

	for index in range(l_matrix_distancia_tiempo):
		#Calculo velocidad en m/s
	    velocidad_m_s= round((matrix_distancia_tiempo["Distancia"][index]) / (matrix_distancia_tiempo["Tiempo_Segundos"][index]),3)
	    velocidad_m_s_append.append(velocidad_m_s)
	    l_velocidad=len(velocidad_m_s_append)
		#Calculo velocidad km/h
	    velocidad_km_h=round(((matrix_distancia_tiempo["Distancia"][index]) / (matrix_distancia_tiempo["Tiempo_Segundos"][index]))/1000*3600,3)
	    velocidad_km_h_append.append(velocidad_km_h)
	Datos_finales={
	    'distance':distance,
	    'vmps':velocidad_m_s_append,
	    'vkph':velocidad_km_h_append,
	    'delta_height': delta_altitud,
	    'type': (np.zeros(len(delta_altitud))),
		'lat_2':latitude2,
		'lat_1':latitude1,
		'lng_2':longitude2,
		'lng_1':longitude1,
		'time':tiempoGrafico,
		'accel':(np.zeros(len(delta_altitud))),
		'accel_type':(np.zeros(len(delta_altitud))),
		'accel_zone':(np.zeros(len(delta_altitud)))
	}
	matrix_datos_finales = pd.DataFrame(Datos_finales)
	#Calculo aceleracion
	for i,line in enumerate(matrix_datos_finales["vmps"]):
		if i==0:
				matrix_datos_finales["accel"][i] = 0
		else:
			matrix_datos_finales["accel"][i] = round((matrix_datos_finales["vmps"][i] - matrix_datos_finales["vmps"][i-1])/(matrix_distancia_tiempo["Tiempo_Segundos"][i]),3)
	acceleration = 'aceleracion'
	desaceleration = 'desaceleracion'
	#Segmentacion aceleracion o desaceleracion
	for i,line in enumerate(matrix_datos_finales["accel"]):
			if matrix_datos_finales["accel"][i] > 0:
				matrix_datos_finales["accel_type"][i] = acceleration
			else:
				matrix_datos_finales["accel_type"][i] = desaceleration
	#Segmentacion zonas aceleracion - desaceleracion
	desacel_low = 'desacel_baja'
	desacel_moderate='desacel_moderada'
	desacel_high='desacel_alta'
	accel_low = 'acel_baja'
	accel_moderate = 'acel_moderada'
	accel_high = 'acel_alta'
	for i,line in enumerate(matrix_datos_finales["accel_type"]):
		if matrix_datos_finales["accel_type"][i] == desaceleration and matrix_datos_finales["accel"][i] <= -4:
			matrix_datos_finales["accel_zone"][i] = desacel_high
			#zona_alta_desacel=zona_alta_desacel +1
		elif matrix_datos_finales["accel_type"][i] == desaceleration and -4 < matrix_datos_finales["accel"][i] <= -2:
			matrix_datos_finales["accel_zone"][i] = desacel_moderate
			#zona_moderada_desacel=zona_moderada_desacel +1
		elif matrix_datos_finales["accel_type"][i] == desaceleration and matrix_datos_finales["accel"][i] > -2:
			matrix_datos_finales["accel_zone"][i] = desacel_low
			#zona_baja_desacel=zona_baja_desacel +1
		elif matrix_datos_finales["accel_type"][i] == acceleration and matrix_datos_finales["accel"][i] <= 2:
			matrix_datos_finales["accel_zone"][i] = accel_low
			#zona_baja_acel=zona_baja_acel +1
		elif matrix_datos_finales["accel_type"][i] == acceleration and 2 < matrix_datos_finales["accel"][i] <= 4:
			matrix_datos_finales["accel_zone"][i] = accel_moderate
			#zona_moderada_acel=zona_moderada_acel +1
		elif matrix_datos_finales["accel_type"][i] == acceleration and matrix_datos_finales["accel"][i] >4:
			matrix_datos_finales["accel_zone"][i] = accel_high
			#zona_alta_acel=zona_alta_acel +1
	#Contabilizar zonas aceleracion
	for i,line in enumerate(matrix_datos_finales["accel_zone"]):
		if i ==0:
			pass
		else:
			if matrix_datos_finales["accel_zone"][i] == desacel_high:
				if matrix_datos_finales["accel_zone"][i] != matrix_datos_finales["accel_zone"][i-1]:
					zona_alta_desacel +=1
				else:
					zona_alta_desacel = zona_alta_desacel

			elif matrix_datos_finales["accel_zone"][i] == desacel_moderate:
				if matrix_datos_finales["accel_zone"][i] != matrix_datos_finales["accel_zone"][i-1]:
					zona_moderada_desacel +=1
				else:
					zona_moderada_desacel = zona_moderada_desacel

			elif matrix_datos_finales["accel_zone"][i] == desacel_low:
				if matrix_datos_finales["accel_zone"][i] != matrix_datos_finales["accel_zone"][i-1]:
					zona_baja_desacel += 1
				else:
					zona_baja_desacel=zona_baja_desacel
			elif matrix_datos_finales["accel_zone"][i] == accel_low:
				if matrix_datos_finales["accel_zone"][i] != matrix_datos_finales["accel_zone"][i-1]:
					zona_baja_acel += 1
				else:
					zona_baja_acel=zona_baja_acel
			elif matrix_datos_finales["accel_zone"][i] == accel_moderate:
				if matrix_datos_finales["accel_zone"][i] != matrix_datos_finales["accel_zone"][i-1]:
					zona_moderada_acel += 1
				else:
					zona_moderada_acel=zona_moderada_acel
			elif matrix_datos_finales["accel_zone"][i] == accel_high:
				if matrix_datos_finales["accel_zone"][i] != matrix_datos_finales["accel_zone"][i-1]:
					zona_alta_acel += 1
				else:
					zona_alta_acel=zona_alta_acel

			#Aumentar para HMLD
	for i,line in enumerate(matrix_datos_finales["accel_zone"]):
		if matrix_datos_finales["accel_zone"][i]== desacel_high or matrix_datos_finales["accel_zone"][i]==desacel_moderate or matrix_datos_finales["accel_zone"][i]==accel_moderate or matrix_datos_finales["accel_zone"][i]==accel_high:
			zona_acel2_distancia = zona_acel2_distancia +(matrix_datos_finales["distance"][i])
	#Clasidicar velocidad
	caminar = 'caminar'
	trotar = 'trotar'
	correr = 'correr'
	sprints = 'sprint'
	for i,line in enumerate(matrix_datos_finales["vkph"]):
	    if 0<= matrix_datos_finales["vkph"][i] < 10.8:
	        matrix_datos_finales["type"][i] = caminar
	    elif 10.8 <= matrix_datos_finales["vkph"][i] < 18:
	        matrix_datos_finales["type"][i] = trotar
	    elif 18 <= matrix_datos_finales["vkph"][i] < 23:
	        matrix_datos_finales["type"][i] = correr
	    elif matrix_datos_finales["vkph"][i] >= 23:
	        matrix_datos_finales["type"][i] = sprints
	#Guarda archivo csv con matriz de resultados de datos totales
	matrix_datos_finales.to_csv(fileSensorInsights)
	#Contabilizar numero sprints
	max_speed=round(matrix_datos_finales["vkph"][0],3)
	for i,line in enumerate(matrix_datos_finales["type"]):
		if i ==0:
			pass
		else:
			if matrix_datos_finales["type"][i] == sprints:
				if matrix_datos_finales["type"][i] != matrix_datos_finales["type"][i-1]:
					num_sprints +=1
				else:
					num_sprints=num_sprints
				if matrix_datos_finales["vkph"][i] >= max_speed:
					max_speed=round(matrix_datos_finales["vkph"][i],3)
				else:
					pass
	#Se genera archivo JSON con distnacias por tipo y distancia total
	for i,line in enumerate(matrix_datos_finales["type"]):
	    if matrix_datos_finales["type"][i] == caminar:
	        distancia_caminar = round(distancia_caminar + matrix_datos_finales["distance"][i],3)
	    elif matrix_datos_finales["type"][i] == trotar:
	        distancia_trotar = round(distancia_trotar + matrix_datos_finales["distance"][i],3)
	    elif matrix_datos_finales["type"][i] == correr:
	        distancia_correr = round(distancia_correr + matrix_datos_finales["distance"][i],3)
	    elif matrix_datos_finales["type"][i] == sprints:
	        distancia_sprints = round(distancia_sprints + matrix_datos_finales["distance"][i],3)
	total = round(distancia_caminar + distancia_trotar + distancia_correr + distancia_sprints,3)
	distancia_relativa=round(total/tiempo_total,3)
	HMLD=round(zona_acel2_distancia+distancia_sprints,3)
	resultado = { "distancia_caminar":distancia_caminar,
	                    "distancia_trotar":distancia_trotar,
	                    "distancia_correr":distancia_correr,
	                    "distancia_sprints":distancia_sprints,
						"distancia_total": total,
						"zona_baja_acel":zona_baja_acel,
						"zona_moderada_acel":zona_moderada_acel,
						"zona_alta_acel":zona_alta_acel,
						"zona_baja_desacel":zona_baja_desacel,
						"zona_moderada_desacel":zona_moderada_desacel,
						"zona_alta_desacel":zona_alta_desacel,
						"distancia_relativa":distancia_relativa,
						"HMLD":HMLD,
						"num_sprints":num_sprints,
						"max_speed":max_speed

	                }
	print resultado
	return resultado
